// This file handles the Spotify API authentication and data fetching

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
// Using the provided refresh token directly
const REFRESH_TOKEN =
  "AQBMbXqeAxnrH4NrXfGJiBzaKMUvERt4SYcns914gMx5XwOfMI_1PFoncACN8J6lJX8QfpKB1pnpiL3_I7Wp-DbW7cleNQksCEwALBZITB9O2NUf4E7pSCcfmq2R4pcaO3o"

const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing"
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token"

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN,
    }),
    cache: "no-store",
  })

  return response.json()
}

export const getNowPlaying = async () => {
  try {
    const { access_token } = await getAccessToken()

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: "no-store",
    })

    if (response.status === 204 || response.status > 400) {
      return { isPlaying: false }
    }

    const song = await response.json()

    if (!song.item) {
      return { isPlaying: false }
    }

    const albumImageUrl = song.item.album.images[0]?.url
    const artist = song.item.artists.map((_artist: any) => _artist.name).join(", ")
    const isPlaying = song.is_playing
    const songUrl = song.item.external_urls.spotify
    const title = song.item.name
    const album = song.item.album.name
    const duration = song.item.duration_ms
    const progress = song.progress_ms

    return {
      album,
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title,
      duration,
      progress,
    }
  } catch (error) {
    console.error("Error fetching now playing:", error)
    return { isPlaying: false, error: true }
  }
}
