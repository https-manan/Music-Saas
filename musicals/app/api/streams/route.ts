import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const YT_REGEX = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;

const StreamSchema = z.object({
  creatorId: z.string(),
  url: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = StreamSchema.parse(body);

    const isYt = YT_REGEX.test(data.url);
    if (!isYt) {
      return NextResponse.json({ error: "Wrong URL format" }, { status: 400 });
    }

    // Extract YouTube video ID (basic example)
    const extractedId = data.url.split("v=")[1]?.split("&")[0] ?? "";

    await prismaClient.stream.create({
      data: {
        userId: data.creatorId,
        url: data.url,
        extractedId,
        type: "Youtube",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
