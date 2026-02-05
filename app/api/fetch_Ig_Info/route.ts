import { fetchProfileInfo } from "@/helper/fetchProfileInfo";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const { username } = Object.fromEntries(searchParams.entries());

  if (!username) {
    return NextResponse.json({
      success: false,
      message: "Username is require",
    });
  }
  const { success, message, user } = await fetchProfileInfo(username);
  if (!success) {
    return NextResponse.json({ success, message });
  }
  return NextResponse.json({
    success,
    user,
    message: `IG data Fetch successfully for IG Username ${username}`,
  });
};
