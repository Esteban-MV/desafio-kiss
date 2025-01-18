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
import { Loader2, X } from 'lucide-react'
import { useStore } from "@/lib/store"
import { useEffect } from "react"
// import { fetchTableData } from "@/lib/actions" // This line is removed because fetchTableData is no longer used.


// Componente para mostrar los datos en una tabla interactiva
export function DataGrid() {
  const { isOver, setNodeRef } = useDroppable({
    id: "grid",
  })
  const { 
    selectedColumns, 
    filters, 
    removeColumn, 
    data, 
    isLoading, 
    error,
    setData, 
    setLoading, 
    setError 
  } = useStore()

  // Efecto para cargar datos cuando cambian las columnas o filtros
  useEffect(() => {
    async function loadData() {
      if (selectedColumns.length === 0) {
        setData([])
        return
      }

      setLoading(true)
      setError(null)

      try {
        const response = await fetch('/api/data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            columns: selectedColumns,
            filters: filters,
          }),
        })

        if (!response.ok) {
          throw new Error('Error al cargar los datos')
        }

        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching data')
        setData([])
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [selectedColumns, filters, setData, setLoading, setError])

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Datos</CardTitle>
        <div className="flex flex-wrap gap-2">
          {selectedColumns.map((column) => (
            <Badge key={column} variant="secondary">
              {column.split(".")[1].replace(/_/g, ' ')}
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
      <CardContent ref={setNodeRef} className={isOver ? "bg-muted/50" : ""}>
        {error ? (
          <div className="text-center p-4 text-red-500">{error}</div>
        ) : isLoading ? (
          <div className="flex justify-center items-center p-8">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : data.length > 0 ? (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  {selectedColumns.map((column) => (
                    <TableHead key={column}>
                      {column.split(".")[1].replace(/_/g, ' ')}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row, i) => (
                  <TableRow key={i}>
                    {selectedColumns.map((column) => (
                      <TableCell key={column}>
                        {row[column.split(".")[1]] ?? '-'}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : selectedColumns.length > 0 ? (
          <div className="text-center p-4 text-muted-foreground">
            No se encontraron datos
          </div>
        ) : (
          <div className="text-center p-4 text-muted-foreground">
            Selecciona columnas para visualizar datos
          </div>
        )}
      </CardContent>
    </Card>
  )
}

