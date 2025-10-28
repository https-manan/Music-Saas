"use client"
import { useEffect, useState, useRef } from "react"
import axios from "axios";
import { useSession } from "next-auth/react";

interface Stream {
    id: string;
    title: string;
    url: string;
    extractedId: string;
    smallImg: string;
    bigImg: string;
    upvotes: number;
    haveUpvoted: boolean;
}

export default function Main() {
    const [streams, setStreams] = useState<Stream[]>([]);
    const [inputUrl, setInputUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [currentVideo, setCurrentVideo] = useState<Stream | null>(null);
    const [player, setPlayer] = useState<any>(null);
    const [isYTReady, setIsYTReady] = useState(false);
    const { data: session, status } = useSession();
    const playerRef = useRef<any>(null);

    // Load YouTube IFrame API
    useEffect(() => {
        // Check if API is already loaded
        if ((window as any).YT && (window as any).YT.Player) {
            setIsYTReady(true);
            return;
        }

        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

        (window as any).onYouTubeIframeAPIReady = () => {
            console.log('YouTube API Ready');
            setIsYTReady(true);
        };
    }, []);

    const refreshStreams = async () => {
        if (status !== "authenticated") return;
        
        try {
            const res = await axios.get('/api/streams/my');
            const fetchedStreams = res.data.streams || [];
            setStreams(fetchedStreams);
            
            // Auto-play the first video if nothing is playing and YT is ready
            if (fetchedStreams.length > 0 && !currentVideo && isYTReady) {
                playVideo(fetchedStreams[0]);
            }
        } catch (error) {
            console.error("Error fetching streams:", error);
        }
    };

    const playVideo = (stream: Stream) => {
        if (!isYTReady) {
            console.log('YouTube API not ready yet');
            return;
        }

        setCurrentVideo(stream);
        
        if (player && typeof player.loadVideoById === 'function') {
            player.loadVideoById(stream.extractedId);
            player.playVideo();
        } else {
            // Destroy old player if exists
            if (playerRef.current) {
                playerRef.current.destroy();
            }

            // Create new player
            const newPlayer = new (window as any).YT.Player('youtube-player', {
                height: '100%',
                width: '100%',
                videoId: stream.extractedId,
                playerVars: {
                    autoplay: 1,
                    controls: 1,
                },
                events: {
                    onReady: (event: any) => {
                        console.log('Player ready');
                        playerRef.current = event.target;
                        setPlayer(event.target);
                    },
                    onStateChange: onPlayerStateChange,
                }
            });
        }
    };

    const onPlayerStateChange = (event: any) => {
        // When video ends (state 0), play next video
        if (event.data === 0) {
            playNextVideo();
        }
    };

    const playNextVideo = () => {
        if (streams.length === 0) return;
        
        const currentIndex = streams.findIndex(s => s.id === currentVideo?.id);
        const nextIndex = (currentIndex + 1) % streams.length;
        playVideo(streams[nextIndex]);
    };

    const playPreviousVideo = () => {
        if (streams.length === 0) return;
        
        const currentIndex = streams.findIndex(s => s.id === currentVideo?.id);
        const prevIndex = currentIndex === 0 ? streams.length - 1 : currentIndex - 1;
        playVideo(streams[prevIndex]);
    };

    const handleAddToQueue = async () => {
        if (!inputUrl.trim()) {
            alert("Please enter a valid URL");
            return;
        }

        if (status !== "authenticated") {
            alert("Please sign in first");
            return;
        }
        
        setLoading(true);
        try {
            await axios.post('/api/streams', {
                url: inputUrl
            });
            setInputUrl("");
            await refreshStreams();
        } catch (error) {
            console.error("Error adding to queue:", error);
            alert("Error adding to queue. Please check the URL format.");
        } finally {
            setLoading(false);
        }
    };

    const handleUpvote = async (streamId: string) => {
        try {
            await axios.post('/api/streams/upvotes', {
                streamId
            });
            await refreshStreams();
        } catch (error) {
            console.error("Error upvoting:", error);
        }
    };

    const handleDownvote = async (streamId: string) => {
        try {
            await axios.post('/api/streams/downvotes', {
                streamId
            });
            await refreshStreams();
        } catch (error) {
            console.error("Error downvoting:", error);
        }
    };

    useEffect(() => {
        if (status === "authenticated") {
            refreshStreams();
            const interval = setInterval(() => {
                refreshStreams();
            }, 10000);
            return () => clearInterval(interval);
        }
    }, [status, isYTReady]);

    if (status === "loading") {
        return <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
            <p className="text-gray-400 text-lg">Loading...</p>
        </div>
    }

    if (status === "unauthenticated") {
        return <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
            <p className="text-gray-400 text-lg">Please sign in to continue</p>
        </div>
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
            <div className="max-w-4xl mx-auto px-6 pt-16 pb-12">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold text-gray-100 mb-3">
                        Start Streaming Now
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Paste your music link and enjoy seamless playback
                    </p>
                </div>

                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-xl">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="text"
                            value={inputUrl}
                            onChange={(e) => setInputUrl(e.target.value)}
                            placeholder="Paste your YouTube music link here..."
                            className="flex-1 bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors"
                            onKeyPress={(e) => e.key === 'Enter' && handleAddToQueue()}
                        />
                        <button 
                            onClick={handleAddToQueue}
                            disabled={loading}
                            className="bg-gray-700 hover:bg-gray-600 text-gray-200 px-6 py-3 rounded-lg font-medium transition-all duration-200 border border-gray-600 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Adding...' : 'Add to Queue'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Video Player Section */}
            <div className="max-w-4xl mx-auto px-6 pb-12">
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 shadow-xl">
                    {currentVideo ? (
                        <div>
                            <div className="aspect-video w-full bg-black rounded-lg overflow-hidden mb-4">
                                <div id="youtube-player" className="w-full h-full"></div>
                            </div>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-gray-100 mb-1">
                                        {currentVideo.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm">Now Playing</p>
                                </div>
                                <img 
                                    src={currentVideo.smallImg} 
                                    alt={currentVideo.title}
                                    className="w-20 h-20 object-cover rounded-lg"
                                />
                            </div>
                            
                            {/* Player Controls */}
                            <div className="flex items-center justify-center gap-4">
                                <button 
                                    onClick={playPreviousVideo}
                                    className="bg-gray-700 hover:bg-gray-600 text-gray-200 p-3 rounded-full transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z"/>
                                    </svg>
                                </button>
                                
                                <button 
                                    onClick={playNextVideo}
                                    className="bg-gray-700 hover:bg-gray-600 text-gray-200 p-3 rounded-full transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-20 h-20 mx-auto mb-4 bg-gray-700 rounded-full flex items-center justify-center">
                                <svg className="w-10 h-10 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z"/>
                                </svg>
                            </div>
                            <p className="text-gray-500 text-lg">No music playing</p>
                            <p className="text-gray-600 text-sm mt-2">Add a link to the queue to get started</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Queue Section */}
            <div className="max-w-4xl mx-auto px-6 pb-12">
                <h3 className="text-xl font-semibold text-gray-100 mb-4">Queue</h3>
                <div className="space-y-4">
                    {streams.length === 0 ? (
                        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
                            <p className="text-gray-500 text-center">Your queue is empty</p>
                        </div>
                    ) : (
                        streams.map((stream) => (
                            <div 
                                key={stream.id} 
                                className={`bg-gray-800 border border-gray-700 rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow cursor-pointer ${
                                    currentVideo?.id === stream.id ? 'ring-2 ring-gray-500' : ''
                                }`}
                                onClick={() => playVideo(stream)}
                            >
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 relative">
                                        <img 
                                            src={stream.smallImg} 
                                            alt={stream.title}
                                            className="w-32 h-20 object-cover rounded-lg bg-gray-700"
                                        />
                                        {currentVideo?.id === stream.id && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                                                <div className="w-8 h-8 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-grow flex flex-col justify-between">
                                        <h4 className="text-gray-100 font-medium text-lg line-clamp-2">
                                            {stream.title}
                                            {currentVideo?.id === stream.id && (
                                                <span className="ml-2 text-sm text-gray-400">(Now Playing)</span>
                                            )}
                                        </h4>
                                        
                                        <div className="flex items-center gap-4 mt-2">
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    stream.haveUpvoted ? handleDownvote(stream.id) : handleUpvote(stream.id);
                                                }}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors border ${
                                                    stream.haveUpvoted 
                                                        ? 'bg-gray-600 border-gray-500 text-gray-100' 
                                                        : 'bg-gray-700 hover:bg-gray-600 border-gray-600 text-gray-200'
                                                }`}
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                                                </svg>
                                                <span className="font-medium">{stream.upvotes}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}