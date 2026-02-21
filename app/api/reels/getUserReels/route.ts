import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { handelAsyc } from "@/helper/handleAsync";

export const GET = async (req: NextRequest) => {
  const params = Object.fromEntries(req.nextUrl.searchParams);
  const { userId } = params;

  const reelsResponse = await getReels(userId);
  return NextResponse.json(reelsResponse);
};

const getReels = async (userId: string) => {
  const res = await handelAsyc(async () => {
    const reelsResponse = await axios.get(
      `${process.env.BACKEND_ENDPOINT!}/api/getReels?userId=${userId}`,
    );
    const { success, messsage, data } = reelsResponse.data;
    if (!success) throw new Error(messsage);
    return data;
  }, "Error getting reels");
  return res;
};
