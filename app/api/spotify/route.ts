import { getNowPlaying } from "@/lib/spotify"
import { NextResponse } from "next/server"

export async function GET() {
  const response = await getNowPlaying()

  return NextResponse.json(response)
}

// Set revalidation time to 30 seconds
export const revalidate = 30
