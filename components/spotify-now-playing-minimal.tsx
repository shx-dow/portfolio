"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Music } from "lucide-react"

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

export default function SpotifyNowPlayingMinimal() {
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

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-zinc-400 animate-pulse">
        <div className="w-4 h-4 rounded-full bg-zinc-700" />
        <div className="h-4 w-32 bg-zinc-700 rounded" />
      </div>
    )
  }

  if (!data.isPlaying) {
    return (
      <div className="flex items-center gap-2 text-sm text-zinc-400">
        <Music size={16} />
        <span>Not playing</span>
      </div>
    )
  }

  return (
  <div className="flex items-center gap-2 text-sm">
    {data.albumImageUrl ? (
      <div className="relative w-4 h-4 overflow-hidden rounded-full">
        <Image
          src={data.albumImageUrl || "/placeholder.svg"}
          alt={data.album || "Album Cover"}
          width={16}
          height={16}
          className="object-cover"
        />
      </div>
    ) : (
      <Music size={16} className="text-purple-500" />
    )}

    <div className="flex items-center gap-2">
      <div className="w-2 h-2 rounded-full bg-purple-700 animate-pulse dark:bg-purple-500" />
      <a
        href={data.songUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="truncate hover:underline text-zinc-500 dark:text-zinc-200 hover:text-purple-700 dark:hover:text-purple-500 transition-colors"
      >
        {data.title} • {data.artist}
      </a>
    </div>
  </div>
)
}
