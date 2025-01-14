"use client"

import { DndContext, DragEndEvent } from "@dnd-kit/core"
import { useState } from "react"
import { TableSelector } from "./table-selector"
import { DataGrid } from "./data-grid"
import { FilterArea } from "./filter-area"
import { useStore } from "@/lib/store"

export function DataExplorer() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const { addColumnToGrid, addColumnToFilter } = useStore()

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (!over) return

    if (over.id === "grid") {
      addColumnToGrid(active.id as string)
    }

    if (over.id === "filter") {
      addColumnToFilter(active.id as string)
    }

    setActiveId(null)
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-[300px_1fr] gap-4">
        <TableSelector />
        <div className="space-y-4">
          <DataGrid />
          <FilterArea />
        </div>
      </div>
    </DndContext>
  )
}

