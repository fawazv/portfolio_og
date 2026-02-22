"use client";

import { motion } from "framer-motion";
import { RevealHeader } from "@/components/ui/reveal-header";
import { useState } from "react";
import { Github, Linkedin } from "lucide-react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{
        type: "success" | "error" | null;
        message: string;
    }>({ type: null, message: "" });
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = "Name is required.";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Enter a valid email address.";
        }
        if (!formData.message.trim()) newErrors.message = "Message is required.";
        else if (formData.message.trim().length < 10) newErrors.message = "Message must be at least 10 characters.";
        return newErrors;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
        // Clear individual field error on change
        if (errors[id]) setErrors((prev) => ({ ...prev, [id]: "" }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus({ type: null, message: "" });

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                setSubmitStatus({ type: "success", message: "Message sent! I'll get back to you soon." });
                setFormData({ name: "", email: "", message: "" });
                setErrors({});
            } else {
                setSubmitStatus({
                    type: "error",
                    message: data.error || "Something went wrong. Please try emailing me directly.",
                });
            }
        } catch {
            setSubmitStatus({
                type: "error",
                message: "Network error. Please check your connection or email me directly.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-12 md:py-24 bg-background min-h-screen flex items-center relative overflow-hidden">
            {/* Violet ambient orb */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-violet-400/6 dark:bg-violet-600/8 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
            {/* Dot grid */}
            <div className="absolute inset-0 dot-grid pointer-events-none" aria-hidden="true" />
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 lg:gap-32">

                    {/* Left Content */}
                    <div className="flex flex-col justify-between">
                        <div>
                            <RevealHeader className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8 text-foreground leading-[0.9]">
                                Let&apos;s <br /> <span className="gradient-text">Talk.</span>
                            </RevealHeader>
                            <p className="text-xl text-[#6B6F8A] dark:text-[#7B82A8] max-w-sm font-light">
                                Have a role or project in mind? Let&apos;s build something great together.
                            </p>
                        </div>

                        <div className="space-y-8 mt-12 lg:mt-0">
                            <div>
                                <h4 className="text-xs font-mono uppercase tracking-widest text-[#6B6F8A] dark:text-[#7B82A8] mb-2">Email</h4>
                                <a
                                    href="mailto:fawazv.business@gmail.com"
                                    className="text-xl md:text-3xl font-bold hover:text-violet-500 dark:hover:text-violet-400 transition-colors break-all text-space dark:text-[#F0F0FF]"
                                >
                                    fawazv.business@gmail.com
                                </a>
                            </div>
                            <div>
                                <h4 className="text-xs font-mono uppercase tracking-widest text-[#6B6F8A] dark:text-[#7B82A8] mb-3">Socials</h4>
                                <div className="flex gap-6">
                                    <a
                                        href="https://www.linkedin.com/in/mohammed-fawaz-216314280/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-violet-600 dark:text-violet-400 hover:text-space dark:hover:text-white transition-colors"
                                        aria-label="LinkedIn profile (opens in new tab)"
                                    >
                                        <Linkedin size={28} strokeWidth={1.5} />
                                    </a>
                                    <a
                                        href="https://github.com/fawazv/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-violet-600 dark:text-violet-400 hover:text-space dark:hover:text-white transition-colors"
                                        aria-label="GitHub profile (opens in new tab)"
                                    >
                                        <Github size={28} strokeWidth={1.5} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="cosmos-card p-5 md:p-12 rounded-3xl shadow-2xl"
                    >
                        <form
                            className="space-y-12"
                            onSubmit={handleSubmit}
                            noValidate
                            aria-label="Contact form"
                        >
                            <InputField
                                id="name"
                                label="What's your name?"
                                value={formData.name}
                                onChange={handleChange}
                                focusedField={focusedField}
                                setFocusedField={setFocusedField}
                                error={errors.name}
                            />
                            <InputField
                                id="email"
                                label="Your email address"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                focusedField={focusedField}
                                setFocusedField={setFocusedField}
                                error={errors.email}
                            />

                            <div className="relative group">
                                <label
                                    htmlFor="message"
                                    className={`absolute left-0 transition-all duration-300 pointer-events-none font-mono uppercase text-xs tracking-widest ${formData.message || focusedField === "message" ? "-top-6 text-violet-500 dark:text-violet-400 text-[10px]" : "top-2 text-[#6B6F8A] dark:text-[#7B82A8]"}`}
                                >
                                    Tell me about your project
                                </label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField("message")}
                                    onBlur={() => setFocusedField(null)}
                                    aria-describedby={errors.message ? "message-error" : undefined}
                                    aria-invalid={!!errors.message}
                                    className="w-full bg-transparent border-b border-violet-500/15 dark:border-violet-500/20 py-2 text-lg font-medium text-space dark:text-[#F0F0FF] placeholder:text-[#6B6F8A] dark:placeholder:text-[#7B82A8] focus:outline-none transition-colors resize-none focus:border-violet-500/60"
                                />
                                <div className={`absolute bottom-2 left-0 h-[2px] bg-violet-500 transition-all duration-500 ease-out ${focusedField === "message" ? "w-full" : "w-0"}`} />
                                {errors.message && (
                                    <p id="message-error" role="alert" className="mt-2 text-xs font-bold text-red-500 uppercase tracking-wide">
                                        {errors.message}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                aria-busy={isSubmitting}
                                className="glow-btn-violet w-full py-4 bg-violet-600 hover:bg-violet-500 text-white font-semibold tracking-wide text-base rounded-full transition-all duration-300 mt-8 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? "Sending…" : "Send Message"}
                            </button>

                            {submitStatus.message && (
                                <div
                                    role="status"
                                    aria-live="polite"
                                    className={`text-center font-bold uppercase tracking-wide mt-4 ${submitStatus.type === "success" ? "text-green-500" : "text-red-500"}`}
                                >
                                    {submitStatus.message}
                                </div>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

const InputField = ({
    id,
    label,
    type = "text",
    value,
    onChange,
    focusedField,
    setFocusedField,
    error,
}: {
    id: string;
    label: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    focusedField: string | null;
    setFocusedField: (field: string | null) => void;
    error?: string;
}) => (
    <div className="relative group">
        <label
            htmlFor={id}
            className={`absolute left-0 transition-all duration-300 pointer-events-none font-mono uppercase text-xs tracking-widest ${value || focusedField === id ? "-top-6 text-violet-500 dark:text-violet-400 text-[10px]" : "top-2 text-[#6B6F8A] dark:text-[#7B82A8]"}`}
        >
            {label}
        </label>
        <input
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            onFocus={() => setFocusedField(id)}
            onBlur={() => setFocusedField(null)}
            aria-describedby={error ? `${id}-error` : undefined}
            aria-invalid={!!error}
            className="w-full bg-transparent border-b border-violet-500/15 dark:border-violet-500/20 py-2 text-lg font-medium text-space dark:text-[#F0F0FF] focus:outline-none transition-colors focus:border-violet-500/60"
        />
        <div className={`absolute bottom-0 left-0 h-[2px] bg-violet-500 transition-all duration-500 ease-out ${focusedField === id ? "w-full" : "w-0"}`} />
        {error && (
            <p id={`${id}-error`} role="alert" className="mt-2 text-xs font-bold text-red-500 uppercase tracking-wide">
                {error}
            </p>
        )}
    </div>
);
