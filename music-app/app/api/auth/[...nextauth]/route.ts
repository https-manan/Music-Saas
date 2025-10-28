import GoogleProvider from 'next-auth/providers/google';
import NextAuth from "next-auth";
import prisma from '@/app/lib/db';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn(params) {
            try {
                const existingUser = await prisma.user.findFirst({
                    where: { email: params.user.email ?? "" }
                })

                if (!existingUser) {
                    await prisma.user.create({
                        data: {
                            email: params.user.email ?? "",
                            name: params.user.name ?? "",
                            provider: "Google" 
                        }
                    })
                }
                return true
            } catch (error) {
                console.log(error)
                return false
            }
        }
    }
})

export { handler as GET, handler as POST }