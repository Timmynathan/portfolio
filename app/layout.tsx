import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { getContent } from "@/lib/content";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getContent();
  return {
    // First name only, e.g. "Nathaniel | AI Engineer"
    title: `${site.name.split(" ")[0]} | ${site.role}`,
    description: "Personal portfolio website",
  };
}

// Applies the visitor's saved theme and accent before first paint, so there's no flash of the default.
const THEME_INIT_SCRIPT = `(function(){try{var d=document.documentElement,t=localStorage.getItem("theme"),a=localStorage.getItem("accent");if(t==="dark"||t==="light")d.dataset.theme=t;if(a)d.dataset.accent=a;}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: the script below sets data-theme/data-accent on <html> before React hydrates.
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
