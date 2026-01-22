"use client";

import { motion } from "framer-motion";
import { RevealHeader } from "@/components/ui/reveal-header";

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-background min-h-screen flex items-center">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Left Content */}
            <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
            >
                <RevealHeader className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-8 text-foreground">
                    Let's Work <br /> <span className="text-secondary">Together</span>
                </RevealHeader>
                <p className="text-lg text-muted-foreground mb-12 max-w-md">
                    Have a project in mind? I'm currently available for freelance projects and open to full-time opportunities.
                </p>
                
                <div className="space-y-4">
                    <div className="block">
                         <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-1">Email</span>
                         <a href="mailto:fawazv.business@gmail.com" className="text-xl font-bold hover:text-secondary transition-colors">fawazv.business@gmail.com</a>
                    </div>
                     <div className="block">
                         <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-1">Socials</span>
                         <div className="flex gap-4">
                             <a href="https://linkedin.com/in/mohammed-fawaz" target="_blank" rel="noopener noreferrer" className="text-lg font-bold hover:text-secondary transition-colors underline decoration-secondary/30">LinkedIn</a>
                             <a href="https://github.com/fawaz-v" target="_blank" rel="noopener noreferrer" className="text-lg font-bold hover:text-secondary transition-colors underline decoration-secondary/30">GitHub</a>
                         </div>
                    </div>
                </div>
            </motion.div>

            {/* Right Form */}
             <motion.div
                 initial={{ opacity: 0, x: 20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.2 }}
                 className="bg-accent/5 p-8 md:p-12 border border-black/5 dark:border-white/5"
            >
                <form className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Name</label>
                        <input 
                            type="text" 
                            id="name"
                            className="w-full bg-background border-b border-black/10 dark:border-white/10 px-0 py-3 focus:outline-none focus:border-secondary transition-colors"
                            placeholder="John Doe"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email</label>
                        <input 
                            type="email" 
                            id="email"
                            className="w-full bg-background border-b border-black/10 dark:border-white/10 px-0 py-3 focus:outline-none focus:border-secondary transition-colors"
                            placeholder="john@example.com"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Message</label>
                        <textarea 
                            id="message"
                            rows={4}
                            className="w-full bg-background border-b border-black/10 dark:border-white/10 px-0 py-3 focus:outline-none focus:border-secondary transition-colors resize-none"
                            placeholder="Tell me about your project..."
                        />
                    </div>
                    
                    <button type="submit" className="w-full py-4 bg-foreground text-background font-bold uppercase tracking-widest hover:bg-secondary hover:text-white transition-colors mt-4">
                        Send Message
                    </button>
                </form>
            </motion.div>
        </div>
      </div>
    </section>
  );
}
