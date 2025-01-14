"use client"

import { useDroppable } from "@dnd-kit/core"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, Loader2 } from 'lucide-react'
import { useStore } from "@/lib/store"
import { useEffect } from "react"
import { tableConfig } from "@/config/database"

export function DataGrid() {
  const { isOver, setNodeRef } = useDroppable({ id: "grid" })
  const { selectedColumns, removeColumn, data, loading, error, fetchData } = useStore()

  useEffect(() => {
    if (selectedColumns.length > 0) {
      fetchData()
    }
  }, [selectedColumns, fetchData])

  const getColumnLabel = (column: string) => {
    const [table, field] = column.split('.')
    return tableConfig[table]?.fields.find(f => f.key === field)?.label || field
  }

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Datos</CardTitle>
        <div className="flex flex-wrap gap-2">
          {selectedColumns.map((column) => (
            <Badge key={column} variant="secondary">
              {getColumnLabel(column)}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 ml-1"
                onClick={() => removeColumn(column)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent 
        ref={setNodeRef} 
        className={`min-h-[300px] ${isOver ? "bg-muted/50" : ""}`}
      >
        {loading ? (
          <div className="flex justify-center items-center h-[300px]">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-[300px] text-destructive">
            {error}
          </div>
        ) : data.length > 0 ? (
          <div className="rounded-md border overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {selectedColumns.map((column) => (
                    <TableHead key={column}>{getColumnLabel(column)}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row, i) => (
                  <TableRow key={i}>
                    {selectedColumns.map((column) => (
                      <TableCell key={column}>{row[column] ?? '-'}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="flex justify-center items-center h-[300px] text-muted-foreground">
            {selectedColumns.length === 0 
              ? 'Arrastra columnas aquí para ver los datos'
              : 'No hay datos disponibles'}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

