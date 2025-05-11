import { Loader2 } from "lucide-react"

export default function LoadingFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[600px]">
      <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      <p className="mt-4 text-zinc-400">Loading simulator...</p>
    </div>
  )
}
