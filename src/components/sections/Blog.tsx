"use client";

import { motion } from "framer-motion";
import { RevealHeader } from "@/components/ui/reveal-header";

const posts = [
  {
    category: "Journey",
    readTime: "5 min read",
    title: "From Commerce to Code: My Transition",
    image: "/images/insights/commerce_to_code.png",
    excerpt: "How I pivoted from a B.Com degree to Full Stack Development in under a year. The challenges, the late nights, and the breakthroughs.",
    content: `My transition from a B.Com graduate to a Full Stack Developer was one of the most challenging yet rewarding years of my life. 

It started with a simple curiosity about how websites work, which quickly turned into an obsession. I spent my mornings studying accounting and my nights debugging JavaScript. The late nights were tough, often questioning if I was making the right choice, but every breakthrough—the first time a database connection worked, or when a CSS layout finally looked right—fueled my passion.

In under a year, through intensive self-study, bootcamps, and building projects like Elite Hotel and Nxtcart, I managed to bridge the gap between commerce and code.`
  },
  {
    category: "Tech",
    readTime: "8 min read",
    title: "Understanding Microservices Architecture",
    image: "/images/insights/microservices_architecture.png",
    excerpt: "A deep dive into how I built the Elite Hotel backend using Node.js services, Docker, and RabbitMQ for asynchronous communication.",
    content: `When building the Elite Hotel backend, I realized that a monolithic architecture wouldn't scale for the complex booking and notification systems I envisioned. 

I dove into Microservices, breaking down the application into specialized Node.js services. 
- **Booking Service**: Handled reservations and availability.
- **Payment Service**: Integrated with Stripe for secure transactions.
- **Notification Service**: Used RabbitMQ to handle asynchronous tasks like sending confirmation emails without blocking the main flow.

Docker played a crucial role in containerizing these services, ensuring consistency across environments. This journey taught me the importance of scalability and decoupling in modern backend design.`
  },
  {
    category: "Tech",
    readTime: "6 min read",
    title: "Why I picked Next.js for Nxtcart",
    image: "/images/insights/nextjs_ecommerce.png",
    excerpt: "Comparing Create React App (CRA) vs Next.js. Why Server Side Rendering (SSR) and SEO mattered for my e-commerce project.",
    content: `For Nxtcart, an e-commerce platform, performance and SEO were non-negotiable. 

I initially considered Create React App, but the limitations of Client-Side Rendering (CSR) for an e-commerce site were evident. Search engines would have trouble indexing dynamic content, and initial load times could be slow.

Switching to Next.js was a game-changer. 
- **Server-Side Rendering (SSR)**: Allowed for instant page loads and excellent SEO.
- **Static Site Generation (SSG)**: For product pages that don't change frequently.
- **Image Optimization**: Automatically handled large product images.

The result was a blazing-fast, SEO-optimized shopping experience that felt professional and snappy.`
  }
];

import { useState } from "react";
import { ArticleModal } from "@/components/ui/article-modal";
import Image from "next/image";

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<typeof posts[0] | null>(null);

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
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div
                className="relative h-64 bg-accent/10 mb-6 overflow-hidden border border-black/5 dark:border-white/5 cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay for category if image is too bright */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center text-white/40 font-bold uppercase tracking-widest text-2xl transform rotate-45 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  {post.category}
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                <span>{post.category}</span>
                <span className="w-1 h-1 bg-secondary rounded-full" />
                <span>{post.readTime}</span>
              </div>

              <h3
                className="text-xl font-bold uppercase tracking-tight mb-3 group-hover:text-secondary transition-colors cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                {post.title}
              </h3>

              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {post.excerpt}
              </p>

              <button
                onClick={() => setSelectedPost(post)}
                className="group/btn flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground hover:text-secondary transition-colors"
              >
                Read Article
                <span className="transform group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
              </button>
            </motion.article>
          ))}
        </div>

        <ArticleModal
          isOpen={!!selectedPost}
          onClose={() => setSelectedPost(null)}
          article={selectedPost}
        />
      </div>
    </section>
  );
}
