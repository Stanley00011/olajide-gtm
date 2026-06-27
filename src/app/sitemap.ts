import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
import { posts } from "@/data/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/automation",
    "/gtm",
    "/work",
    "/writing",
    "/about",
    "/contact",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const work = projects.map((p) => ({
    url: `${site.url}/work/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const writing = posts.map((p) => ({
    url: `${site.url}/writing/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...routes, ...work, ...writing];
}
