"use client";

import { motion } from "framer-motion";
import { RevealHeader } from "@/components/ui/reveal-header";
import { useState } from "react";
import { ArticleModal } from "@/components/ui/article-modal";
import Image from "next/image";

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
  },
  {
    category: "Design",
    readTime: "4 min read",
    title: "The Art of Minimalist UI",
    image: "/images/insights/minimalist_ui.png",
    excerpt: "Why 'Less is More' isn't just a trend, but a necessity for modern web applications. Exploring whitespace, typography, and functional colors.",
    content: `Minimalism in UI design is often misunderstood as simply removing elements. In reality, it's about prioritizing what matters most to the user.

When designing this portfolio, I adhered to three core principles:
1. **Whitespace is Active**: It's not empty space; it's a design element that guides the eye and reduces cognitive load.
2. **Typography as Interface**: Good type hierarchy eliminates the need for excessive borders and boxes.
3. **Intentional Motion**: Animations should serve a purpose—providing feedback or continuity—rather than just being decoration.

By stripping away the non-essential, we enhance the essential.`
  },
  {
    category: "Tech",
    readTime: "7 min read",
    title: "Scaling with Docker & K8s",
    image: "/images/insights/docker_k8s.png",
    excerpt: "Moving from a single VPS to a container orchestration strategy. How Docker simplified my deployment pipeline.",
    content: `As my applications grew in complexity, "it works on my machine" became a frequent blocker. Deployment was manual, error-prone, and inconsistent.

Adopting Docker changed everything:
- **Consistency**: The dev environment matches production bit-for-bit.
- **Isolation**: Services like Redis, Postgres, and Node.js run in their own containers without conflict.
- **Portability**: I can deploy to AWS, DigitalOcean, or a Raspberry Pi with the same commands.

While Kubernetes (K8s) adds complexity, understanding the basics of container orchestration gave me the confidence to build truly cloud-native systems.`
  }
];

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<typeof posts[0] | null>(null);

  return (
    <section id="blog" className="py-24 bg-background border-t border-black/5 dark:border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-16">
          <RevealHeader className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">
            Insights
          </RevealHeader>
          <div className="hidden md:block text-sm font-bold uppercase tracking-widest text-muted-foreground">
            Read my latest thoughts
          </div>
        </div>

        {/* Bento / Magazine Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
          {posts.map((post, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-3xl cursor-pointer bg-accent/5 border border-black/5 dark:border-white/5 ${index === 0 ? "md:col-span-2" : "md:col-span-1"}`}
              onClick={() => setSelectedPost(post)}
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 lg:bg-black/40 lg:group-hover:bg-black/50 transition-colors duration-500" />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white/70 mb-3">
                  <span className="px-2 py-1 border border-white/20 rounded-full bg-white/10 backdrop-blur-md">{post.category}</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className={`font-bold text-neon-blue lg:text-white mb-3 leading-tight lg:group-hover:text-neon-blue transition-colors ${index === 0 ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"}`}>
                  {post.title}
                </h3>

                {index === 0 && (
                  <p className="text-white/80 text-base md:text-lg font-serif italic line-clamp-2 max-w-xl">
                    {post.excerpt}
                  </p>
                )}

                <div className="mt-6 transform translate-y-0 opacity-100 lg:translate-y-4 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 transition-all duration-300">
                  <span className="text-sm font-bold uppercase tracking-wider text-neon-blue flex items-center gap-2">
                    Read Article <span>→</span>
                  </span>
                </div>
              </div>
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
