"use client"
import { useSession, signIn, signOut } from "next-auth/react"

export const Appbar = () => {
  const session = useSession()

  return (
    <div className="flex justify-between p-4 items-center shadow-md bg-white">
      <div className="text-2xl font-bold text-purple-600">Musicals</div>
      <div>
        {session.data?.user && (
          <button
            onClick={() => signOut()}
            className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
          >
            Sign Out
          </button>
        )}
        {!session.data?.user && (
          <button
            onClick={() => signIn()}
            className="px-4 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition"
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  )
}
