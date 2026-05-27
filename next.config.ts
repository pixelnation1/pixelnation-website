import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects: async () => [
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
    { source: "/shop", destination: "/repairs", permanent: true },
  ],
};

export default nextConfig;
