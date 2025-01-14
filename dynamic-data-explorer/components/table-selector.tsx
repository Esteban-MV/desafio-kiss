"use client"

import { useDraggable } from "@dnd-kit/core"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const tables = {
  empresa_contratista: [
    "id_emp_con",
    "rut_emp_con",
    "nombre_emp_con",
    "correo_emp_con",
    "status_emp_con"
  ],
  empresa_principal: [
    "id_emp_pri",
    "rut_emp_pri",
    "nombre_emp_pri",
    "correo_emp_pri",
    "status_emp_pri"
  ],
  empresa_subcontratista: [
    "id_emp_subcon",
    "rut_emp_subcon",
    "nombre_emp_subcon",
    "correo_emp_subcon",
    "status_emp_subcon"
  ],
  empresas_unidas: [
    "id_emp_uni",
    "rut_emp_pri",
    "rut_emp_con",
    "rut_emp_subcon"
  ],
  periodo: [
    "id_periodo",
    "mesanio_periodo",
    "minimo_imponible_periodo",
    "maximo_imponible_periodo",
    "status_periodo"
  ],
  solicitud: [
    "id_sol",
    "id_emp_uni",
    "nombre_contrato_sol",
    "cant_trab_acreditar_sol",
    "total_trab_sol",
    "estado_certificacion_sol",
    "id_periodo"
  ],
  trabajadores: [
    "id_trabajador",
    "rut_trabajador",
    "nombre_trabajador",
    "apaterno_trabajador",
    "amaterno_trabajador",
    "id_sol"
  ]
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
            {Object.entries(tables).map(([table, fields]) => (
              <AccordionItem key={table} value={table}>
                <AccordionTrigger className="text-sm capitalize">
                  {table.replace(/_/g, ' ')}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {fields.map((field) => (
                      <DraggableField key={`${table}.${field}`} table={table} field={field} />
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

function DraggableField({ table, field }: { table: string; field: string }) {
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
      {field.replace(/_/g, ' ')}
    </div>
  )
}

