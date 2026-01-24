"use client";

import { motion } from "framer-motion";
import { RevealHeader } from "@/components/ui/reveal-header";
import { useState } from "react";
import { Github, Linkedin, Twitter } from "lucide-react";

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

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ type: null, message: "" });

        // Simulate API call
        setTimeout(() => {
            setSubmitStatus({ type: "success", message: "Message Sent Successfully!" });
            setIsSubmitting(false);
            setFormData({ name: "", email: "", message: "" });
        }, 1500);
    };

    const InputField = ({ id, label, type = "text", value, onChange }: any) => (
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
                required
                value={value}
                onChange={onChange}
                onFocus={() => setFocusedField(id)}
                onBlur={() => setFocusedField(null)}
                className="w-full bg-transparent border-b border-foreground/40 py-2 text-lg font-medium text-foreground focus:outline-none transition-colors"
            />
            {/* Animated Line */}
            <div className={`absolute bottom-0 left-0 h-[2px] bg-secondary transition-all duration-500 ease-out ${focusedField === id ? "w-full" : "w-0"}`} />
        </div>
    );

    return (
        <section id="contact" className="py-24 bg-background min-h-screen flex items-center relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">

                    {/* Left Content */}
                    <div className="flex flex-col justify-between">
                        <div>
                            <RevealHeader className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8 text-foreground leading-[0.9]">
                                Let's <br /> <span className="text-secondary">Talk.</span>
                            </RevealHeader>
                            <p className="text-xl text-muted-foreground max-w-sm font-serif italic">
                                Have a vision? Let's bring it to life with code and creativity.
                            </p>
                        </div>

                        <div className="space-y-8 mt-16 lg:mt-0">
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Email</h4>
                                <a href="mailto:fawazv.business@gmail.com" className="text-xl md:text-3xl font-bold hover:text-secondary transition-colors break-all">fawazv.business@gmail.com</a>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Socials</h4>
                                <div className="flex gap-6">
                                    <a href="#" className="hover:text-secondary transition-colors text-foreground" aria-label="LinkedIn">
                                        <Linkedin size={28} strokeWidth={1.5} />
                                    </a>
                                    <a href="#" className="hover:text-secondary transition-colors text-foreground" aria-label="GitHub">
                                        <Github size={28} strokeWidth={1.5} />
                                    </a>
                                    <a href="#" className="hover:text-secondary transition-colors text-foreground" aria-label="Twitter">
                                        <Twitter size={28} strokeWidth={1.5} />
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
                        className="bg-white/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-6 md:p-12 rounded-3xl backdrop-blur-md shadow-2xl"
                    >
                        <form className="space-y-12" onSubmit={handleSubmit}>
                            <InputField id="name" label="What's your name?" value={formData.name} onChange={handleChange} />
                            <InputField id="email" label="Your email address" type="email" value={formData.email} onChange={handleChange} />

                            <div className="relative group">
                                <label
                                    htmlFor="message"
                                    className={`absolute left-0 transition-all duration-300 pointer-events-none uppercase text-xs font-bold tracking-widest ${formData.message || focusedField === "message" ? "-top-6 text-secondary text-[10px]" : "top-2 text-foreground/60"}`}
                                >
                                    Tell me about your project
                                </label>
                                <textarea
                                    id="message"
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField("message")}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full bg-transparent border-b border-foreground/40 py-2 text-lg font-medium text-foreground focus:outline-none transition-colors resize-none"
                                />
                                <div className={`absolute bottom-2 left-0 h-[2px] bg-secondary transition-all duration-500 ease-out ${focusedField === "message" ? "w-full" : "w-0"}`} />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-6 bg-secondary text-secondary-foreground font-black uppercase tracking-[0.2em] text-lg hover:bg-secondary/90 transition-all hover:tracking-[0.3em] duration-300 mt-8 rounded-xl shadow-[0_0_20px_-5px_var(--secondary)] hover:shadow-[0_0_30px_-5px_var(--secondary)]"
                            >
                                {isSubmitting ? "Sending..." : "Send Message"}
                            </button>

                            {submitStatus.message && (
                                <div className={`text-center font-bold uppercase tracking-wide mt-4 ${submitStatus.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
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
