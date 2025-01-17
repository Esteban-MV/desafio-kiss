import { DataExplorer } from "@/components/data-explorer"

export default function Page() {
  return (
    <main className="min-h-screen p-4 bg-background">
      <h1 className="text-2xl font-bold mb-4">Explorador de Datos de Empresas</h1>
      <DataExplorer />
    </main>
  )
}

