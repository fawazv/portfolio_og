/*
 * Projects — single source for the work cards (home) and the case-study pages
 * (/work/[slug]). Every claim here comes from the project's own repository:
 * README, docker-compose.yml, package.json, CI workflows, or the project notes
 * (nxt-cart/PROJECT_EXPLANATION.md). The AI video editor comes from its own
 * project files (CLAUDE.md, MY-GUIDE.md, docs/WORKFLOW.md) and the real run on
 * the "Claude killed video editors?" reel. Nothing is invented; keep it that way.
 */

export type Project = {
  slug: string;
  title: string;
  year: string;
  kind: string;
  /** One line for the card */
  summary: string;
  image: string;
  liveUrl?: string;
  /** Omitted when the code isn't public */
  githubUrl?: string;
  /** A how-to guide on this site (/guides/...) */
  guideUrl?: string;
  /** Three checkable numbers or facts */
  facts: { value: string; label: string }[];
  /** "What it is" — a short paragraph */
  overview: string;
  /** "How it's built" */
  built: string[];
  /** "Decisions worth explaining" (omitted when the repo doesn't document any) */
  decisions?: { title: string; body: string }[];
  stack: string[];
};

export const projects: Project[] = [
  {
    slug: "ai-video-editor",
    title: "AI Video Editor",
    year: "2026",
    kind: "AI agent workflow",
    summary:
      "A Claude Code workflow that turns one raw talking-head take into a captioned, on-brand reel, and checks its own work before I see it.",
    image: "/images/projects/ai-video-editor.webp",
    guideUrl: "/guides/claude-video-editing",
    facts: [
      { value: "76 → 65.6 s", label: "raw take to finished reel" },
      { value: "39", label: "choices rated on the storyboard" },
      { value: "3", label: "review rounds" },
    ],
    overview:
      "I make reels in Malayalam and English. Instead of opening an editor, I drop the take in a folder and describe the edit. Claude cuts the dead air, captions my exact words, adds motion graphics in my brand, face-tracked effects and sound, then builds a storyboard page where I rate every single choice Keep, Maybe or Drop. Nothing is rendered for delivery until every item is Keep or Drop.",
    built: [
      "Claude Code drives the whole run, steered by a set of agent skills: HyperFrames, face-tracked effects, motion and caption rules, and my own editing playbook.",
      "Speech to text with whisper.cpp for English and a separate model for Malayalam; I correct the Malayalam words once and a script aligns them back onto the timings.",
      "ffmpeg does the cuts, colour grade and voice level before the edit. Every cut is a whole number of frames, so sound and picture both run exactly 65.633 s.",
      "HyperFrames renders the edit from HTML, so each caption and graphic sits on an exact frame.",
      "earshot measures sound, because Claude can't hear: every effect comes from my own packs and is checked by measurement, and a moment with no fitting sound is left as a gap for me.",
      "Python scripts build the storyboard and Brand Lab review pages, and a delivery check tests frame count, black or frozen frames, loudness (−14 LUFS) and true peak.",
    ],
    decisions: [
      {
        title: "A human rates every choice",
        body: "The agent proposes; I decide. Each cut, caption, graphic, effect and sound gets its own preview on the storyboard, and only a submitted round of ratings moves the edit forward.",
      },
      {
        title: "My brand as values, not vibes",
        body: "Colours, fonts, caption and title style live in brand/brand.json, made from reference reels I like and approved sample by sample in the Brand Lab. Every video starts from it.",
      },
      {
        title: "Only my own pictures and sounds",
        body: "The agent never generates or downloads images or sounds. It asks for exactly what an effect needs, blurs names and notifications, strips location data and never touches the originals.",
      },
    ],
    stack: ["Claude Code", "Agent skills", "HyperFrames", "ffmpeg", "whisper.cpp", "Python", "Node.js", "earshot"],
  },
  {
    slug: "elite-hotel",
    title: "Elite Hotel",
    year: "2025",
    kind: "Microservices system",
    summary:
      "Hotel management split into ten domain services behind an Express API gateway, talking over RabbitMQ.",
    image: "/images/projects/elite-hotel.webp",
    githubUrl: "https://github.com/fawazv/Elite-hotel",
    facts: [
      { value: "10", label: "domain services" },
      { value: "1", label: "API gateway" },
      { value: "1 DB", label: "per service" },
    ],
    overview:
      "A full-stack hotel management platform: rooms, guests, reservations, billing, payments, housekeeping, communication and notifications. Each domain is its own Express service with its own MongoDB database. A gateway is the single entry point, and services tell each other what happened through RabbitMQ events.",
    built: [
      "React 19 and Vite front end with Redux Toolkit, TanStack Query and Socket.io for real-time updates.",
      "Ten Node.js and Express services in TypeScript: auth, user, room, guest, reservation, payment, billing, housekeeping, communication and notification.",
      "An API gateway (http-proxy-middleware) that routes /api/* to each service, with rate limiting, Helmet security headers and JWT checks.",
      "RabbitMQ for events between services: a “reservation created” event is what triggers the notification service.",
      "Stripe payment intents and webhooks in the payment service; OTP verification by email with Nodemailer in the auth service.",
      "Docker Compose runs all eleven containers plus RabbitMQ; GitHub Actions runs the CI/CD workflow.",
    ],
    decisions: [
      {
        title: "A database per service",
        body: "Every service owns its data, so no service can reach into another's tables. Services stay loosely coupled and can be changed or redeployed on their own.",
      },
      {
        title: "Events for side effects, REST for requests",
        body: "Client requests go through the gateway as plain HTTP. Anything that should happen as a result, like sending a confirmation, is published as an event and handled asynchronously, so a slow email never holds up a booking.",
      },
      {
        title: "Security at the front door",
        body: "Rate limiting, security headers and token checks live in the gateway, so each service doesn't have to re-implement them.",
      },
    ],
    stack: ["Node.js", "Express", "TypeScript", "RabbitMQ", "MongoDB", "Docker", "React 19", "Stripe", "Socket.io"],
  },
  {
    slug: "nxtcart",
    title: "Nxtcart",
    year: "2025",
    kind: "E-commerce platform",
    summary: "A full store on Next.js 15: cart, multi-step checkout with Stripe and PayPal, and an admin dashboard.",
    image: "/images/projects/nxtcart.webp",
    liveUrl: "https://nxt-cart.vercel.app/",
    githubUrl: "https://github.com/fawazv/nxt-cart",
    facts: [
      { value: "2", label: "payment providers" },
      { value: "3-step", label: "checkout" },
      { value: "Live", label: "on Vercel" },
    ],
    overview:
      "An e-commerce platform that covers the whole journey: product discovery, a persistent cart, checkout, order tracking, and an admin side for products, orders and sales analytics.",
    built: [
      "Next.js 15 App Router with Server Components for data fetching and Server Actions (lib/actions) for mutations, so there's no separate API layer.",
      "MongoDB with Mongoose; sign-in with Auth.js (NextAuth) and its MongoDB adapter.",
      "Stripe and PayPal payments, including Stripe webhooks.",
      "Admin dashboard with sales charts in Recharts, built on MongoDB aggregation queries.",
      "Forms with React Hook Form and Zod; image uploads with UploadThing; emails with Resend; translations with next-intl.",
      "Tailwind CSS and Radix UI components; deployed on Vercel.",
    ],
    decisions: [
      {
        title: "Orders keep a snapshot of the price",
        body: "When an order is placed, the product's price and details are copied into it. If a price changes later, past orders still show what the customer actually paid.",
      },
      {
        title: "No duplicate payments on refresh",
        body: "Before creating a Stripe payment intent, checkout looks for one the order already has. Refreshing the payment step no longer creates orphan payment sessions, and the webhook handler checks its database connection before writing.",
      },
      {
        title: "Filters live in the URL",
        body: "Search and filter state is kept in the query string, so a filtered result can be bookmarked or shared.",
      },
      {
        title: "Missing products don't crash the page",
        body: "Data loaders return nothing instead of throwing when a product is gone, and the page shows “Product not found” instead of a server error.",
      },
    ],
    stack: ["Next.js 15", "TypeScript", "MongoDB", "Auth.js", "Stripe", "PayPal", "Tailwind CSS", "Recharts"],
  },
  {
    slug: "dropbox-clone",
    title: "Dropbox Clone",
    year: "2025",
    kind: "Cloud file storage",
    summary: "Sign in with Clerk, drag files in, then rename, delete and sort them in a table.",
    image: "/images/projects/dropbox-clone.webp",
    liveUrl: "https://dropbox-clone-peach-seven.vercel.app/",
    githubUrl: "https://github.com/fawazv/dropbox-clone",
    facts: [
      { value: "Clerk", label: "auth + route protection" },
      { value: "Firebase", label: "storage + Firestore" },
      { value: "Live", label: "on Vercel" },
    ],
    overview:
      "A Dropbox-style file storage app with a responsive dashboard: secure sign-in, drag-and-drop uploads, and a sortable table of files you can rename or delete. Light and dark themes.",
    built: [
      "Next.js 14 and TypeScript with Tailwind CSS, shadcn/ui and Radix UI.",
      "Clerk for sign-in and sign-up, with middleware protecting the dashboard routes.",
      "Uploads with React Dropzone into Firebase Storage; file details stored in Firestore.",
      "TanStack Table for the file list; Zustand for modal state; React Hot Toast for feedback; skeleton loaders while data loads.",
      "Deployed on Vercel.",
    ],
    stack: ["Next.js 14", "TypeScript", "Firebase", "Firestore", "Clerk", "Zustand", "Tailwind CSS"],
  },
  {
    slug: "blog-platform",
    title: "Blog Platform",
    year: "2025",
    kind: "Microservices backend",
    summary: "A blog backend split into user, post and comment services behind a gateway, with RabbitMQ between them.",
    image: "/images/projects/blog-platform.webp",
    githubUrl: "https://github.com/fawazv/Blog-microservice",
    facts: [
      { value: "3", label: "services" },
      { value: "11", label: "endpoints" },
      { value: "CI/CD", label: "GitHub Actions" },
    ],
    overview:
      "The backend for a blog: accounts, posts and comments, each in its own service. A gateway on port 5000 routes /user, /post and /comment to them.",
    built: [
      "Express services in TypeScript with MongoDB.",
      "JWT and bcrypt for sign-up and sign-in; protected routes for writing posts and comments.",
      "RabbitMQ (amqplib): the user service publishes user data to a queue and the post service consumes it.",
      "Docker and Docker Compose for the whole stack; a GitHub Actions pipeline for CI/CD.",
    ],
    stack: ["Node.js", "Express", "TypeScript", "MongoDB", "RabbitMQ", "Docker", "JWT", "GitHub Actions"],
  },
  {
    slug: "pixabay-gallery",
    title: "Pixabay Gallery",
    year: "2025",
    kind: "Front-end project",
    summary: "Image search on the Pixabay API, shown in a responsive grid. A small React and Vite project.",
    image: "/images/projects/pixabay-gallery.webp",
    githubUrl: "https://github.com/fawazv/1.-react-tailwind-pixabay-gallery",
    facts: [
      { value: "React 18", label: "with Vite" },
      { value: "Axios", label: "API requests" },
      { value: "Tailwind", label: "responsive grid" },
    ],
    overview:
      "Search for images and browse the results in a responsive gallery. Requests go to the Pixabay API with Axios.",
    built: [
      "React 18 with Vite for the build.",
      "Tailwind CSS for the responsive grid.",
      "Axios for requests to the Pixabay API; the API key comes from an environment variable.",
    ],
    stack: ["React 18", "Vite", "Tailwind CSS", "Axios"],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
