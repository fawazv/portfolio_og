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
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 lg:gap-32">

                    {/* Left Content */}
                    <div className="flex flex-col justify-between">
                        <div>
                            <RevealHeader className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8 text-foreground leading-[0.9]">
                                Let&apos;s <br /> <span className="text-secondary">Talk.</span>
                            </RevealHeader>
                            <p className="text-xl text-muted-foreground max-w-sm font-serif italic">
                                Have a role or project in mind? Let&apos;s build something great together.
                            </p>
                        </div>

                        <div className="space-y-8 mt-12 lg:mt-0">
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Email</h4>
                                <a
                                    href="mailto:fawazv.business@gmail.com"
                                    className="text-xl md:text-3xl font-bold hover:text-secondary transition-colors break-all"
                                >
                                    fawazv.business@gmail.com
                                </a>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Socials</h4>
                                <div className="flex gap-6">
                                    <a
                                        href="https://www.linkedin.com/in/mohammed-fawaz-216314280/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-secondary transition-colors text-foreground"
                                        aria-label="LinkedIn profile (opens in new tab)"
                                    >
                                        <Linkedin size={28} strokeWidth={1.5} />
                                    </a>
                                    <a
                                        href="https://github.com/fawazv/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-secondary transition-colors text-foreground"
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
                        className="bg-white/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-5 md:p-12 rounded-3xl backdrop-blur-md shadow-2xl"
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
                                    className={`absolute left-0 transition-all duration-300 pointer-events-none uppercase text-xs font-bold tracking-widest ${formData.message || focusedField === "message" ? "-top-6 text-secondary text-[10px]" : "top-2 text-foreground/60"}`}
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
                                    className="w-full bg-transparent border-b border-foreground/40 py-2 text-lg font-medium text-foreground focus:outline-none transition-colors resize-none"
                                />
                                <div className={`absolute bottom-2 left-0 h-[2px] bg-secondary transition-all duration-500 ease-out ${focusedField === "message" ? "w-full" : "w-0"}`} />
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
                                className="w-full py-6 bg-secondary text-secondary-foreground font-black uppercase tracking-[0.2em] text-lg hover:bg-secondary/90 transition-all hover:tracking-[0.3em] duration-300 mt-8 rounded-xl shadow-[0_0_20px_-5px_var(--secondary)] hover:shadow-[0_0_30px_-5px_var(--secondary)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:tracking-[0.2em]"
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
            className={`absolute left-0 transition-all duration-300 pointer-events-none uppercase text-xs font-bold tracking-widest ${value || focusedField === id ? "-top-6 text-secondary text-[10px]" : "top-2 text-foreground/60"}`}
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
            className="w-full bg-transparent border-b border-foreground/40 py-2 text-lg font-medium text-foreground focus:outline-none transition-colors"
        />
        <div className={`absolute bottom-0 left-0 h-[2px] bg-secondary transition-all duration-500 ease-out ${focusedField === id ? "w-full" : "w-0"}`} />
        {error && (
            <p id={`${id}-error`} role="alert" className="mt-2 text-xs font-bold text-red-500 uppercase tracking-wide">
                {error}
            </p>
        )}
    </div>
);
