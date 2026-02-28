"use client";
import React from "react";
import { Google } from "../icons/Google";
import { Send } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Reel12 from "@/public/reels/reel12.webp";
import Reel13 from "@/public/reels/reel13.webp";
import Reel14 from "@/public/reels/reel14.webp";
import NavbarLogo from "../Logo/NavbarLogo";
import useSignIn from "@/hooks/useSignIn";

function Login() {
  const handelSignIn = useSignIn();
  return (
    <div className="w-full min-h-screen flex bg-white animate-fade-in">
      {/* Left - Branding */}
      <div className="hidden lg:flex w-1/2 bg-[#0B0B0F] text-white flex-col justify-center items-center px-16 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-pink-500/20 rounded-full blur-3xl" />

        <NavbarLogo />

        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-10 text-center max-w-md"
        >
          <h1 className="text-3xl font-bold leading-tight">
            Make your Instagram saves{" "}
            <span className="bg-gradient-to-r from-[#6C5CE7] to-[#FF4D8D] bg-clip-text text-transparent">
              searchable
            </span>
          </h1>

          <p className="mt-4 text-zinc-400 text-sm leading-relaxed">
            Just DM your reels and access them anytime with powerful search. No
            more endless scrolling through saved posts.
          </p>
        </motion.div>

        {/* Reel Animation Area */}
        <div className="relative w-[280px] h-[420px] flex items-center justify-center">
          {/* Left Reel */}
          <motion.div
            initial={{ x: -120, opacity: 0, rotate: -12 }}
            animate={{ x: -120, opacity: 0.6, rotate: -12 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute"
          >
            <Image
              src={Reel12}
              alt="Reel Left"
              width={160}
              height={280}
              className="rounded-xl shadow-xl"
            />
          </motion.div>

          {/* Right Reel */}
          <motion.div
            initial={{ x: 120, opacity: 0, rotate: 12 }}
            animate={{ x: 120, opacity: 0.6, rotate: 12 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute"
          >
            <Image
              src={Reel13}
              alt="Reel Right"
              width={160}
              height={280}
              className="rounded-xl shadow-xl"
            />
          </motion.div>

          {/* Center Reel (Main) */}
          <motion.div
            initial={{ y: 120, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative z-10"
          >
            <Image
              src={Reel14}
              alt="Main Reel"
              width={200}
              height={360}
              className="rounded-2xl shadow-2xl border border-white/10"
            />
          </motion.div>
        </div>
      </div>

      {/* Right - Login */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-zinc-100 via-white to-zinc-200 px-6">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="p-8 space-y-6 animate-slide-up">
            {/* Logo */}
            <div className="flex items-center justify-center gap-2 lg:hidden">
              <Send className="w-5 h-5 text-[#6C5CE7]" />
              <h2 className="text-2xl font-semibold tracking-tight">
                Just{" "}
                <span className="bg-gradient-to-r from-[#6C5CE7] to-[#FF4D8D] bg-clip-text text-transparent">
                  DM
                </span>
              </h2>
            </div>

            {/* Heading */}
            <div className="text-center space-y-1">
              <h3 className="text-xl font-semibold text-zinc-900">
                Welcome back
              </h3>
              <p className="text-sm text-zinc-500">
                Sign in to access your saved reels workspace
              </p>
            </div>

            {/* Google Button */}
            <button
              onClick={handelSignIn}
              className="w-full flex items-center justify-center gap-3 px-5 py-3 bg-white border border-zinc-300 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 font-medium text-zinc-700"
            >
              <Google />
              Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 text-xs text-zinc-400">
              <div className="flex-1 h-px bg-zinc-200" />
              OR
              <div className="flex-1 h-px bg-zinc-200" />
            </div>

            {/* Trust text */}
            <p className="text-xs text-center text-zinc-500">
              Trusted by creators & agencies
            </p>

            {/* Footer */}
            <p className="text-xs text-center text-zinc-400 leading-relaxed">
              By continuing, you agree to our Terms & Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
