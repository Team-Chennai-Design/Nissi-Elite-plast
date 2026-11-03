import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Google ignores #fragments, so only real URLs belong here.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
