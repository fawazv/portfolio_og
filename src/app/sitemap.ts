import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { guides } from "@/content/guides";

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
        {
            url: `${baseUrl}/guides`,
            lastModified,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        ...guides.map((g) => ({
            url: `${baseUrl}/guides/${g.slug}`,
            lastModified: new Date(g.updatedIso),
            changeFrequency: "monthly" as const,
            priority: 0.8,
        })),
    ];
}
