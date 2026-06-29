import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_CONFIG.name,
    short_name: SITE_CONFIG.shortName,
    description: SITE_CONFIG.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0d0d15",
    icons: [
      {
        src: SITE_CONFIG.logo,
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: SITE_CONFIG.logo,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: SITE_CONFIG.logo,
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    categories: ["business", "technology", "productivity"],
  };
}
