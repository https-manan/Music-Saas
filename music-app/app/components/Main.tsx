export default function Main() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
            {/* Hero Section with Link Input */}
            <div className="max-w-4xl mx-auto px-6 pt-16 pb-12">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold text-gray-100 mb-3">
                        Start Streaming Now
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Paste your music link and enjoy seamless playback
                    </p>
                </div>

                {/* Link Input Section */}
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-xl">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="text"
                            placeholder="Paste your music link here..."
                            className="flex-1 bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors"
                        />
                        <button className="bg-gray-700 hover:bg-gray-600 text-gray-200 px-6 py-3 rounded-lg font-medium transition-all duration-200 border border-gray-600 shadow-sm hover:shadow-md">
                            Add to Queue
                        </button>
                    </div>
                </div>
            </div>

            {/* Music Player Display Area */}
            <div className="max-w-4xl mx-auto px-6 pb-12">
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 shadow-xl min-h-[300px] flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-4 bg-gray-700 rounded-full flex items-center justify-center">
                            <svg className="w-10 h-10 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z"/>
                            </svg>
                        </div>
                        <p className="text-gray-500 text-lg">No music playing</p>
                        <p className="text-gray-600 text-sm mt-2">Add a link to the queue to get started</p>
                    </div>
                </div>
            </div>

            {/* Queue Section (Optional - for future use) */}
            <div className="max-w-4xl mx-auto px-6 pb-12">
                <h3 className="text-xl font-semibold text-gray-100 mb-4">Queue</h3>
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
                    <p className="text-gray-500 text-center">Your queue is empty</p>
                </div>
            </div>
        </div>
    )
}