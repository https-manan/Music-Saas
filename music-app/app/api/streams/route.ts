import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server'
import { z } from 'zod'
import prisma from '@/app/lib/db'
import { GetVideoDetails } from 'youtube-search-api'
import { getServerSession } from 'next-auth';

const streamSchema = z.object({
    url: z.string()
})

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession();
        
        if (!session || !session.user?.email) {
            return NextResponse.json({
                message: 'Unauthenticated'
            }, { status: 401 });
        }

        const user = await prisma.user.findFirst({
            where: { email: session.user.email }
        });

        if (!user) {
            return NextResponse.json({
                message: 'User not found'
            }, { status: 404 });
        }

        const data = streamSchema.parse(await req.json());
        
        const extractedId = data.url.split('?v=')[1];
        
        if (!extractedId) {
            return NextResponse.json({
                message: 'Invalid YouTube URL'
            }, { status: 400 });
        }

        const res = await GetVideoDetails(extractedId);
        const thumbnails = res.thumbnail.thumbnails;
        thumbnails.sort((a: { width: number }, b: { width: number }) => a.width - b.width);
        
        await prisma.stream.create({
            data: {
                userId: user.id,
                url: data.url,
                extractedId,
                type: 'Youtube',
                title: res.title ?? 'Untitled',
                smallImg: (thumbnails.length > 1 ? thumbnails[thumbnails.length - 2].url : thumbnails[thumbnails.length - 1].url),
                bigImg: thumbnails[thumbnails.length - 1].url
            }
        });
        
        return NextResponse.json({
            message: 'Added to stream successfully'
        }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: 'Error while adding to stream'
        }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    const creatorId = req.nextUrl.searchParams.get('creatorId');
    
    if (!creatorId) {
        return NextResponse.json({
            message: 'Creator ID required'
        }, { status: 400 });
    }

    const streams = await prisma.stream.findMany({
        where: {
            userId: creatorId
        }
    })
    
    return NextResponse.json({
        streams
    })
}