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
import { tableConfig } from "@/config/database"

const filterOptions = {
  status_emp_con: ['0', '1'],
  status_emp_pri: ['0', '1'],
  status_emp_subcon: ['0', '1'],
  status_periodo: ['0', '1'],
  estado_certificacion_sol: [
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
}

export function FilterArea() {
  const { isOver, setNodeRef } = useDroppable({ id: "filter" })
  const { filters, removeFilter, updateFilterValue, fetchData } = useStore()

  useEffect(() => {
    const hasActiveFilters = filters.some(f => f.value)
    if (hasActiveFilters) {
      fetchData()
    }
  }, [filters, fetchData])

  const getColumnLabel = (column: string) => {
    const [table, field] = column.split('.')
    return tableConfig[table]?.fields.find(f => f.key === field)?.label || field
  }

  const getFilterOptionsForField = (field: string) => {
    const fieldName = field.split('.')[1]
    return filterOptions[fieldName] || []
  }

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Filtros</CardTitle>
      </CardHeader>
      <CardContent 
        ref={setNodeRef} 
        className={`min-h-[100px] ${isOver ? "bg-muted/50" : ""}`}
      >
        <div className="flex flex-wrap gap-4">
          {filters.map((filter) => (
            <div key={filter.column} className="flex items-center gap-2">
              <Badge variant="outline">
                {getColumnLabel(filter.column)}
              </Badge>
              <Select
                value={filter.value}
                onValueChange={(value) => updateFilterValue(filter.column, value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Seleccionar valor" />
                </SelectTrigger>
                <SelectContent>
                  {getFilterOptionsForField(filter.column).map((value) => (
                    <SelectItem key={value} value={value}>
                      {value === '0' ? 'Desactivado' : 
                       value === '1' ? 'Activado' : value}
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
          {filters.length === 0 && (
            <div className="text-muted-foreground text-sm p-4">
              Arrastra campos aquí para filtrar los datos
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

