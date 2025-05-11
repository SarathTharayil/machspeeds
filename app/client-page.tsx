"use client"

import dynamic from "next/dynamic"
import LoadingFallback from "@/components/loading-fallback"

// Dynamically import SpeedSimulator with no SSR to avoid Leaflet issues
const SpeedSimulator = dynamic(() => import("@/components/speed-simulator"), {
  ssr: false,
  loading: () => <LoadingFallback />,
})

export default function ClientPage() {
  return <SpeedSimulator />
}
