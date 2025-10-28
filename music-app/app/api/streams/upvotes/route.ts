import { z } from 'zod'
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from '@/app/lib/db';

const UpvoteSchema = z.object({
    streamId: z.string()
})

export async function POST(req: NextRequest) {
    const session = await getServerSession()
    
    if (!session || !session.user?.email) {
        return NextResponse.json({
            message: 'Unauthenticated User'
        }, {
            status: 403
        })
    }

    const user = await prisma.user.findFirst({
        where: { email: session.user.email }
    })
    
    if (!user) { 
        return NextResponse.json({
            message: 'User not found'
        }, {
            status: 404
        })
    }

    try {
        const data = UpvoteSchema.parse(await req.json())
        
        await prisma.upvote.create({
            data: {
                userId: user.id,
                streamId: data.streamId
            }
        })
        
        return NextResponse.json({
            message: 'Upvoted successfully'
        })
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: 'Server error'
        }, {
            status: 500
        })
    }
}