import { getUserInfo } from "@/helper/getUserInfo";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const { userId } = Object.fromEntries(searchParams.entries());

    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "userId is required",
      });
    }

    const userResponse = await getUserInfo({ userId });

    if (!userResponse.success) {
      return NextResponse.json({
        success: false,
        message: userResponse.message,
      });
    }

    return NextResponse.json({ success: true, user: userResponse.user });
  } catch (error) {
    console.error("GET /api/user error:", error);

    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
};
