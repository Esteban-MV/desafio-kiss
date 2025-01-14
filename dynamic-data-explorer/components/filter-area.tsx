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
import { X } from 'lucide-react'
import { useStore } from "@/lib/store"
import { useEffect } from "react"

export function FilterArea() {
  const { isOver, setNodeRef } = useDroppable({
    id: "filter",
  })
  const { filters, removeFilter, updateFilterValue, fetchData } = useStore()

  useEffect(() => {
    const hasActiveFilters = filters.some(f => f.value)
    if (hasActiveFilters) {
      fetchData()
    }
  }, [filters, fetchData])

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
                  <SelectValue placeholder="Seleccionar valor" />
                </SelectTrigger>
                <SelectContent>
                  {getFilterOptions(filter.column).map((value) => (
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

function getFilterOptions(column: string): string[] {
  const [table, field] = column.split('.')
  
  switch (field) {
    case 'status_emp_con':
    case 'status_emp_pri':
    case 'status_emp_subcon':
    case 'status_periodo':
      return ['0', '1']
    case 'estado_certificacion_sol':
      return [
        'Ingresado',
        'Solicitado',
        'Aprobado',
        'No Aprobado',
        'Certificado',
        'Documentado',
        'Histórico',
        'Completo',
        'En Proceso',
        'No Conforme',
        'Inactivo',
        'No certificado'
      ]
    default:
      return []
  }
}

