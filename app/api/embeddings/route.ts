import { createEmbedding } from "@/app/helper/createEmbedding";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const { userQuery } = Object.fromEntries(searchParams.entries());

    // Validate input
    if (!userQuery || userQuery.trim() === "") {
      return NextResponse.json({
        success: false,
        error: "userQuery parameter is required",
      });
    }

    const embeddings = await createEmbedding(userQuery);

    return NextResponse.json({
      success: true,
      embeddings: embeddings.embedding,
    });
  } catch (error) {
    console.error("Embedding API error:", error);

    // Handle specific error types
    if (error instanceof Error) {
      return NextResponse.json({
        success: false,
        message: error.message,
      });
    }

    // Generic error fallback
    return NextResponse.json({
      success: false,
      message: "Failed to create embedding",
    });
  }
};
