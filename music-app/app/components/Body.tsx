export default function Body() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
            <div className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
                <h1 className="text-5xl font-bold text-gray-100 mb-4">
                    Welcome to StreamSync
                </h1>
                <p className="text-gray-400 text-xl mb-8">
                    Share and listen to music together in real-time
                </p>
                <p className="text-gray-500 text-lg">
                    Sign in to start streaming your favorite tracks
                </p>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-16">
                <h3 className="text-2xl font-bold text-gray-100 text-center mb-12">
                    Why Choose Us
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h4 className="text-xl font-semibold text-gray-100 mb-2">
                            High Speed
                        </h4>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Experience lightning-fast streaming with minimal buffering and instant playback
                        </p>
                    </div>

                    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                            </svg>
                        </div>
                        <h4 className="text-xl font-semibold text-gray-100 mb-2">
                            Stream Your Music
                        </h4>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Share and listen to your favorite tracks from anywhere with seamless streaming
                        </p>
                    </div>

                    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                        </div>
                        <h4 className="text-xl font-semibold text-gray-100 mb-2">
                            High Quality
                        </h4>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Enjoy crystal-clear audio quality with pristine sound reproduction
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}