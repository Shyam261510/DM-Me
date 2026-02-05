import NextAuth from "next-auth";
import { NEXT_AUTH } from "@/libs/NextAuth";

const handler = NextAuth(NEXT_AUTH);

export const GET = handler;
export const POST = handler;
