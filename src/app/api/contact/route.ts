import { NextResponse } from "next/server";
import nodemailer, { type Transporter } from "nodemailer";

export const runtime = "nodejs";

const LIMITS = { name: 100, email: 254, message: 5000, minMessage: 10 } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Per-visitor rate limit: 5 messages per 10 minutes. In-memory, so it applies
// per server instance (good enough for a portfolio; use a shared store if the
// site ever runs on many instances).
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }
  return recent.length > MAX_PER_WINDOW;
}

function clientKey(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Reuse one SMTP connection pool across requests instead of reconnecting each time.
let transporter: Transporter | null = null;
function getTransporter(): Transporter {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      pool: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
  return transporter;
}

function bad(error: string, status = 400) {
  return NextResponse.json({ error }, { status });
}

export async function POST(req: Request) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_TO) {
    console.error("Contact form: EMAIL_USER, EMAIL_PASS or EMAIL_TO is not set");
    return bad("The contact form is not available right now. Please email me directly.", 503);
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return bad("Send the form as JSON.");
  }
  if (!body || typeof body !== "object") return bad("Send the form as JSON.");

  const { name, email, message, company } = body as Record<string, unknown>;

  // Honeypot: real visitors never see or fill this field. Pretend success for bots.
  if (typeof company === "string" && company.trim() !== "") {
    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  }

  if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
    return bad("Fill in your name, email and message.");
  }

  const cleanName = name.trim().replace(/[\r\n]+/g, " ");
  const cleanEmail = email.trim();
  const cleanMessage = message.trim();

  if (!cleanName || !cleanEmail || !cleanMessage) {
    return bad("Fill in your name, email and message.");
  }
  if (cleanName.length > LIMITS.name) return bad(`Keep your name under ${LIMITS.name} characters.`);
  if (cleanEmail.length > LIMITS.email || !EMAIL_RE.test(cleanEmail)) {
    return bad("Enter a valid email address, like name@example.com.");
  }
  if (cleanMessage.length < LIMITS.minMessage) {
    return bad(`Write at least ${LIMITS.minMessage} characters in your message.`);
  }
  if (cleanMessage.length > LIMITS.message) {
    return bad(`Keep your message under ${LIMITS.message} characters.`);
  }

  if (isRateLimited(clientKey(req))) {
    return bad("Too many messages in a short time. Try again in a few minutes, or email me directly.", 429);
  }

  const safeName = escapeHtml(cleanName);
  const safeEmail = escapeHtml(cleanEmail);
  const safeMessage = escapeHtml(cleanMessage).replace(/\n/g, "<br>");

  try {
    await getTransporter().sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      replyTo: cleanEmail,
      subject: `New contact form message from ${cleanName}`,
      text: `Name: ${cleanName}\nEmail: ${cleanEmail}\n\nMessage:\n${cleanMessage}\n`,
      html: `
        <h3>New contact form message</h3>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
    });

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return bad("The message could not be sent. Please try again or email me directly.", 500);
  }
}
