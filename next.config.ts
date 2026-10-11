import type { NextConfig } from "next";

// Images uploaded from the admin console live in Supabase storage; allow next/image to serve them.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseHost = supabaseUrl ? new URL(supabaseUrl) : null;

// next/image refuses local addresses by default; allow them only when Supabase itself runs locally (supabase start).
const supabaseIsLocal = supabaseHost ? ["localhost", "127.0.0.1"].includes(supabaseHost.hostname) : false;

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: supabaseIsLocal,
    remotePatterns: supabaseHost
      ? [
          {
            protocol: supabaseHost.protocol === "http:" ? "http" : "https",
            hostname: supabaseHost.hostname,
            port: supabaseHost.port,
            pathname: "/storage/v1/object/public/**",
          },
        ]
      : [],
  },
};

export default nextConfig;
