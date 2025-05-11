export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-2 text-center">Mach Speed Simulator</h1>
        <p className="text-center mb-8 text-zinc-400">
          Compare speeds of missiles, fighter jets, and aircraft and calculate travel times
        </p>

        {/* Import the client component that handles the dynamic import */}
        <ClientPage />
      </div>
    </main>
  )
}

// Import the client component
import ClientPage from "./client-page"
