import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "@/libs/NextAuthProvider";
import { ReduxProvider } from "@/libs/ReduxProvider";
import { Toaster } from "@/components/ui/sonner";
import TanstackProvider from "@/libs/TanstackProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DM Me",
  description: "New way to manage your Insta saves",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
