"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Music, Pause, Play } from "lucide-react"

type NowPlayingData = {
  album?: string
  albumImageUrl?: string
  artist?: string
  isPlaying: boolean
  songUrl?: string
  title?: string
  duration?: number
  progress?: number
  error?: boolean
}

export default function SpotifyNowPlaying() {
  const [data, setData] = useState<NowPlayingData>({ isPlaying: false })
  const [loading, setLoading] = useState(true)

  const fetchNowPlaying = async () => {
    try {
      const res = await fetch("/api/spotify")
      const newData = await res.json()
      setData(newData)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching Spotify data:", error)
      setData({ isPlaying: false, error: true })
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNowPlaying()

    // Set up polling to refresh data every second
    const intervalId = setInterval(fetchNowPlaying, 1000)

    return () => clearInterval(intervalId)
  }, [])

  const progressPercentage = data.duration && data.progress ? Math.min(100, (data.progress / data.duration) * 100) : 0

  return (
    <div className="flex flex-col w-full max-w-sm rounded-lg overflow-hidden bg-zinc-900 text-white shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="relative">
        {loading ? (
          <div className="w-full aspect-square bg-zinc-800 animate-pulse" />
        ) : data.isPlaying && data.albumImageUrl ? (
          <Image
            src={data.albumImageUrl || "/placeholder.svg"}
            alt={data.album || "Album Cover"}
            width={300}
            height={300}
            className="w-full aspect-square object-cover"
          />
        ) : (
          <div className="w-full aspect-square bg-zinc-800 flex items-center justify-center">
            <Music size={64} className="text-zinc-600" />
          </div>
        )}

        {/* Spotify logo */}
        <div className="absolute top-3 right-3 bg-black bg-opacity-50 rounded-full p-1.5">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
              fill="#1DB954"
            />
            <path
              d="M16.7302 16.7377C16.5335 17.0142 16.1698 17.0815 15.8932 16.8848C13.4689 15.3927 10.4628 15.0951 6.95321 15.9755C6.63977 16.0586 6.32669 15.8618 6.24359 15.5483C6.16049 15.2349 6.35731 14.9218 6.67075 14.8387C10.4913 13.8842 13.8028 14.2344 16.5831 15.9007C16.8597 16.0974 16.927 16.4611 16.7302 16.7377ZM18.0706 13.8813C17.8226 14.2259 17.3595 14.3105 17.0149 14.0625C14.2149 12.3331 10.1434 11.8597 6.84451 12.9177C6.45731 13.0381 6.04906 12.8154 5.92864 12.4282C5.80822 12.041 6.03097 11.6328 6.41816 11.5124C10.1951 10.3127 14.7266 10.8379 17.8894 12.8256C18.234 13.0736 18.3186 13.5367 18.0706 13.8813ZM18.1921 10.9311C14.8423 8.9708 9.39259 8.74242 6.21381 9.70962C5.75556 9.85308 5.27628 9.58318 5.13282 9.12493C4.98935 8.66668 5.25925 8.1874 5.7175 8.04394C9.34387 6.94641 15.3596 7.21383 19.1943 9.47791C19.6053 9.7263 19.7128 10.2538 19.4644 10.6648C19.216 11.0758 18.6885 11.1833 18.2775 10.9349L18.1921 10.9311Z"
              fill="white"
            />
          </svg>
        </div>

        {/* Playing indicator */}
        {data.isPlaying && (
          <div className="absolute bottom-3 right-3 bg-black bg-opacity-50 rounded-full p-1.5">
            {data.isPlaying ? (
              <Play size={16} className="text-green-500 fill-green-500" />
            ) : (
              <Pause size={16} className="text-white" />
            )}
          </div>
        )}
      </div>

      {/* Progress bar */}
      {data.isPlaying && (
        <div className="w-full h-1 bg-zinc-800">
          <div
            className="h-full bg-green-500 transition-all duration-1000 ease-linear"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      )}

      <div className="p-4">
        {loading ? (
          <>
            <div className="h-5 w-3/4 bg-zinc-800 rounded animate-pulse mb-2" />
            <div className="h-4 w-1/2 bg-zinc-800 rounded animate-pulse" />
          </>
        ) : data.isPlaying ? (
          <>
            <a
              href={data.songUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-base line-clamp-1 hover:underline"
            >
              {data.title}
            </a>
            <p className="text-sm text-zinc-400 line-clamp-1">{data.artist}</p>
          </>
        ) : (
          <div className="text-center py-2">
            <p className="text-zinc-400">Not playing anything right now</p>
          </div>
        )}
      </div>
    </div>
  )
}
