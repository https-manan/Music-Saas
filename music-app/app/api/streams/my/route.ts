import prisma from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const session = await getServerSession();

    if (!session || !session.user?.email) {
        return NextResponse.json({ error: "LoginIn 1st" }, { status: 401 });
    }

    try {
        const user = await prisma.user.findFirst({
            where: { email: session.user.email }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        
        const streams = await prisma.stream.findMany({
            where: { userId: user.id },
            include: {
                _count: {
                    select: {
                        upvote: true
                    }
                },
                upvote: {
                    where: {
                        userId: user.id
                    }
                }
            }
        });

        return NextResponse.json({
            streams: streams.map(({ _count, upvote, ...rest }) => ({
                ...rest,
                upvotes: _count.upvote,
                haveUpvoted: upvote.length > 0
            }))
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Server error"
        }, { status: 500 });
    }
}