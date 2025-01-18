"use client"

import { useDroppable } from "@dnd-kit/core"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2, X } from 'lucide-react'
import { useStore } from "@/lib/store"
import { useEffect, useState } from "react"
import { fetchFilterValues } from "@/lib/actions"

export function FilterArea() {
  const { isOver, setNodeRef } = useDroppable({
    id: "filter",
  })
  const { filters, removeFilter, updateFilterValue } = useStore()
  // Estado local para manejar las opciones de filtro
  const [filterOptions, setFilterOptions] = useState<Record<string, string[]>>({})
  const [loadingFilters, setLoadingFilters] = useState<Record<string, boolean>>({})

  // Efecto para cargar valores únicos para cada filtro
  useEffect(() => {
    async function loadFilterValues(column: string) {
      if (filterOptions[column]) return

      setLoadingFilters(prev => ({ ...prev, [column]: true }))
      try {
        const response = await fetch('/api/filters', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ column }),
        })

        if (!response.ok) {
          throw new Error('Error al cargar los valores del filtro')
        }

        const values = await response.json()
        setFilterOptions(prev => ({ ...prev, [column]: values }))
      } catch (error) {
        console.error(`Error loading filter values for ${column}:`, error)
      } finally {
        setLoadingFilters(prev => ({ ...prev, [column]: false }))
      }
    }

    filters.forEach(filter => {
      if (!filterOptions[filter.column]) {
        loadFilterValues(filter.column)
      }
    })
  }, [filters, filterOptions])

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Filtros</CardTitle>
      </CardHeader>
      <CardContent ref={setNodeRef} className={isOver ? "bg-muted/50" : ""}>
        <div className="flex flex-wrap gap-4">
          {filters.map((filter) => (
            <div key={filter.column} className="flex items-center gap-2">
              <Badge variant="outline">
                {filter.column.split(".")[1].replace(/_/g, ' ')}
              </Badge>
              <Select
                value={filter.value}
                onValueChange={(value) => updateFilterValue(filter.column, value)}
              >
                <SelectTrigger className="w-[180px]">
                  {loadingFilters[filter.column] ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <SelectValue placeholder="Seleccionar valor" />
                  )}
                </SelectTrigger>
                <SelectContent>
                  {filterOptions[filter.column]?.map((value) => (
                    <SelectItem key={value} value={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeFilter(filter.column)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

