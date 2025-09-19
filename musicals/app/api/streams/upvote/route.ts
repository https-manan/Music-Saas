import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import z from "zod";

const upvoteSchema = z.object({
    streamId:z.string()
})


export async function POST(req:NextRequest){
    const session = await getServerSession();
    if(!session?.user?.email){
        
    }
    const data = upvoteSchema.parse(await req.json())
}