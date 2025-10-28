import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server'
import { z } from 'zod'
import prisma from '@/app/lib/db'
import youtubesearchapi from 'youtube-search-api'

const streamSchema = z.object({
    creatorId: z.string(),
    url: z.string()
})

export async function POST(req: NextRequest) {
    try {
        const data = streamSchema.parse(await req.json())
        const extractedId = data.url.split('?v=')[1];
        const res = await youtubesearchapi.GetVideoDetails(extractedId)
        const thumbnails = res.thumbnail.thumbnails;
        thumbnails.sort((a: { width: number }, b: { width: number }) => a.width - b.width)
        
        await prisma.stream.create({
            data: {
                userId: data.creatorId,
                url: data.url,
                extractedId,
                type: 'Youtube',
                title: res.title,
                smallImg: (thumbnails.length > 1 ? thumbnails[thumbnails.length - 2].url : thumbnails[thumbnails.length - 1].url),
                bigImg: thumbnails[thumbnails.length - 1].url
            }
        })
        
        return NextResponse.json({
            message: 'Added to stream successfully'
        }, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            message: 'Error while adding to stream'
        }, {
            status: 411
        })
    }
}

export async function GET(req: NextRequest) {
    const creatorId = req.nextUrl.searchParams.get('creatorId');
    const streams = await prisma.stream.findMany({
        where: {
            userId: creatorId ?? ""
        }
    })
    return NextResponse.json({
        streams
    })
}