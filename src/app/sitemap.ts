import type { MetadataRoute } from "next";
import { invitation } from "@/lib/invitation";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${invitation.seo.siteUrl}/`, changeFrequency: "monthly", priority: 1 }];
}
