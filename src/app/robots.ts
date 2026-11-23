import type { MetadataRoute } from "next";
import { invitation } from "@/lib/invitation";

// Crawlers reject previews they are not allowed to fetch, so the share card
// depends on this file as much as on the tags in layout.tsx.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${invitation.seo.siteUrl}/sitemap.xml`,
  };
}
