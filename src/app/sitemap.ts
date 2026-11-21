import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://fawazv.online";
    const lastModified = new Date();

    return [
        {
            url: baseUrl,
            lastModified,
            changeFrequency: "monthly",
            priority: 1,
        },
        // One page per case study (section anchors like /#about are ignored by search engines)
        ...projects.map((p) => ({
            url: `${baseUrl}/work/${p.slug}`,
            lastModified,
            changeFrequency: "monthly" as const,
            priority: 0.8,
        })),
    ];
}
