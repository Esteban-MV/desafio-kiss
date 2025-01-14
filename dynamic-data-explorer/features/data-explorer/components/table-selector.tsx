"use client"

import { useDraggable } from "@dnd-kit/core"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { tableConfig } from "@/config/database"

interface DraggableFieldProps {
  table: string
  field: string
  label: string
}

function DraggableField({ table, field, label }: DraggableFieldProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${table}.${field}`,
  })

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="p-2 bg-muted rounded cursor-move hover:bg-muted/80 transition-colors text-sm"
    >
      {label}
    </div>
  )
}

export function TableSelector() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tablas y Campos</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-200px)]">
          <Accordion type="single" collapsible className="w-full">
            {Object.entries(tableConfig).map(([tableKey, table]) => (
              <AccordionItem key={tableKey} value={tableKey}>
                <AccordionTrigger className="text-sm">
                  {table.name}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {table.fields.map((field) => (
                      <DraggableField
                        key={`${tableKey}.${field.key}`}
                        table={tableKey}
                        field={field.key}
                        label={field.label}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

