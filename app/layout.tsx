import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "@/libs/NextAuthProvider";
import { ReduxProvider } from "@/libs/ReduxProvider";
import { Toaster } from "@/components/ui/sonner";
import TanstackProvider from "@/libs/TanstackProvider";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JustDM – Save and Organize Instagram Reels Easily",
  description: "JustDM helps you save Instagram reels via DM, organize them with tags, and find them instantly. No more endless scrolling through Instagram saves.",
  keywords: [
    "save instagram reels",
    "organize instagram reels",
    "instagram reel manager",
    "instagram save organizer",
    "find saved reels instagram",
    "instagram dm automation",
    "content organizer instagram",
    "tools for content creators instagram",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased`}
        style={{ scrollBehavior: "smooth" }}
      >
        <NextAuthProvider>
          <TanstackProvider>
            <ReduxProvider>
              {children}

              <Toaster />
            </ReduxProvider>
          </TanstackProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
