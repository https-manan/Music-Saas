"use client"
import { signIn, signOut, useSession } from "next-auth/react"

export function Appbar() {
    const session = useSession()
    return (
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700 shadow-lg">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-600 rounded-lg flex items-center justify-center shadow-md">
                            <svg className="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z"/>
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-100 tracking-tight">Musicals</h1>
                            <p className="text-xs text-gray-400">Share & Listen Together</p>
                        </div>
                    </div>
                    <div>
                        {session.data?.user ? (
                            <div className="flex items-center space-x-4">
                                <div className="hidden sm:flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center text-sm font-medium text-gray-200">
                                        {session.data.user.name?.charAt(0).toUpperCase() || 'M'}
                                    </div>
                                    <span className="text-sm text-gray-300">{session.data.user.name}</span>
                                </div>
                                <button 
                                    onClick={() => signOut()} 
                                    className="bg-gray-700 hover:bg-gray-600 text-gray-200 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium border border-gray-600 shadow-sm hover:shadow-md"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <button 
                                onClick={() => signIn()} 
                                className="bg-gray-700 hover:bg-gray-600 text-gray-200 px-5 py-2 rounded-lg transition-all duration-200 text-sm font-medium border border-gray-600 shadow-sm hover:shadow-md"
                            >
                                Sign In
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}