"use client";

import { motion } from "framer-motion";
import { RevealHeader } from "@/components/ui/reveal-header";

const posts = [
  {
    title: "The Future of React Server Components",
    date: "Oct 12, 2023",
    readTime: "5 min read",
    excerpt: "Exploring the shift towards server-first architectures and what it means for frontend optimization."
  },
  {
    title: "Mastering Tailwind v4",
    date: "Nov 05, 2023",
    readTime: "8 min read",
    excerpt: "Deep dive into the new engine, CSS variables, and how to migrate your existing projects."
  },
  {
    title: "Building Accessible Animations",
    date: "Dec 10, 2023",
    readTime: "6 min read",
    excerpt: "How to use Framer Motion responsibly without compromising web accessibility standards."
  }
];

export default function Blog() {
  return (
    <section id="blog" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-16"
        >
             <RevealHeader className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">
                 Insights
             </RevealHeader>
             <a href="#" className="hidden md:block text-sm font-bold uppercase tracking-wide border-b border-foreground pb-1 hover:text-secondary transition-colors">
                 View All Posts
             </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post, index) => (
                <motion.article 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group cursor-pointer"
                >
                    <div className="relative h-64 bg-accent/10 mb-6 overflow-hidden border border-black/5 dark:border-white/5">
                        <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 transition-transform duration-500 group-hover:scale-105" />
                         {/* Placeholder for Blog Image */}
                         <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 font-bold uppercase tracking-widest text-2xl transform rotate-45">
                             Cover
                         </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                        <span>{post.date}</span>
                        <span className="w-1 h-1 bg-secondary rounded-full" />
                        <span>{post.readTime}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold uppercase tracking-tight mb-3 group-hover:text-secondary transition-colors">
                        {post.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        {post.excerpt}
                    </p>
                </motion.article>
            ))}
        </div>
      </div>
    </section>
  );
}
