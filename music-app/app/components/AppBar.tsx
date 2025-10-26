"use client"
import { signIn, signOut, useSession } from "next-auth/react"

export function Appbar() {
    const session = useSession()
    return (
        <div className="flex justify-between items-center px-4 py-2 bg-gray-800 text-white">
            <div className="text-lg font-semibold">
                Music
            </div>
            <div className="space-x-2">
                {session.data?.user ? (
                    <button onClick={() => signOut()} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition">Logout</button>):
                    <button onClick={() => signIn()} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition">
                        Sign In
                    </button>
                }
            </div>
        </div>
    )
}
