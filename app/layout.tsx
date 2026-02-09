import type { Metadata } from "next";
import { Google_Sans } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "@/libs/NextAuthProvider";
import { ReduxProvider } from "@/libs/ReduxProvider";
import { Toaster } from "@/components/ui/sonner";
import TanstackProvider from "@/libs/TanstackProvider";

const googlSans = Google_Sans({
  variable: "--font-googl-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "JustDM – Save and Organize Instagram Reels Easily",
  description:
    "JustDM helps you save Instagram reels via DM, organize them with tags, and find them instantly. No more endless scrolling through Instagram saves.",
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
        className={`${googlSans.className} antialiased`}
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
