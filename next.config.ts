import type { NextConfig } from "next";

const retiredStorefrontPaths = [
  "/birthday-parties/:path*",
  "/buy-sell-trade/:path*",
  "/commander-nights/:path*",
  "/communities/:path*",
  "/console-trade-ins/:path*",
  "/disney-lorcana-emporia-ks/:path*",
  "/events/:path*",
  "/family-gaming/:path*",
  "/gaming/:path*",
  "/gaming-community/:path*",
  "/gaming-lounge/:path*",
  "/learn-to-play/:path*",
  "/magic-the-gathering-emporia-ks/:path*",
  "/new-releases/:path*",
  "/one-piece-card-game-emporia-ks/:path*",
  "/pokemon-cards-emporia-ks/:path*",
  "/portfolio/midwest-pixelfest/:path*",
  "/portfolio/tcgkingdoms/:path*",
  "/preorders/:path*",
  "/preorders-new-releases/:path*",
  "/sell-magic-cards/:path*",
  "/sell-pokemon-cards/:path*",
  "/sell-to-pixelnation/:path*",
  "/sell-video-games/:path*",
  "/tcg/:path*",
  "/trade-values/:path*",
  "/trading-card-philosophy/:path*",
  "/trading-card-store-emporia-ks/:path*",
  "/trading-cards/:path*",
  "/weekly-events/:path*",
  "/what-to-expect/:path*",
  "/what-we-carry/:path*",
  "/yu-gi-oh-cards-emporia-ks/:path*",
];

const nextConfig: NextConfig = {
  redirects: async () => [
    ...retiredStorefrontPaths.map((source) => ({ source, destination: "/", permanent: true })),
    { source: "/phone-repair-emporia-ks", destination: "/phone-repair", permanent: true },
    { source: "/computer-repair-emporia-ks", destination: "/computer-repair", permanent: true },
    { source: "/appliance-repair-emporia-ks", destination: "/appliance-repair", permanent: true },
    { source: "/console-repair-emporia-ks", destination: "/console-repair", permanent: true },
    { source: "/data-recovery-emporia-ks", destination: "/data-recovery", permanent: true },
    { source: "/board-repair-emporia-ks", destination: "/board-repair", permanent: true },
    { source: "/microsoldering-emporia-ks", destination: "/board-repair", permanent: true },
    { source: "/microsoldering", destination: "/board-repair", permanent: true },
    {
      source: "/microsoldering-training-courses.html",
      destination: "/training-courses",
      permanent: true,
    },
    {
      source: "/microsoldering-training.html",
      destination: "/training",
      permanent: true,
    },
    {
      source: "/about-pixelnation.html",
      destination: "/about",
      permanent: true,
    },
    { source: "/track-repair", destination: "/contact", permanent: true },
  ],
};

export default nextConfig;
