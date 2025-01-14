import { DataExplorer } from "@/features/data-explorer"

export default function Page() {
  return (
    <main className="min-h-screen p-4 bg-background">
      <h1 className="text-2xl font-bold mb-4">Explorador de Datos</h1>
      <DataExplorer />
    </main>
  )
}

