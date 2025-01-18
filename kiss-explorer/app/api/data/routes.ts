import { NextResponse } from 'next/server'
import { executeQuery, closePool } from '../db'

export async function POST(request: Request) {
  try {
    const { columns, filters } = await request.json()
    
    // Construir la consulta SQL
    let tables = new Set<string>()
    let selectedColumns = columns.map((col: string) => {
      const [table, field] = col.split('.')
      tables.add(table)
      return `${table}.${field}`
    })

    let tablesList = Array.from(tables)
    let query = `SELECT ${selectedColumns.join(', ')} FROM ${tablesList[0]}`

    // Agregar JOINs
    if (tablesList.includes('empresa_contratista') && tablesList.includes('empresas_unidas')) {
      query += ` LEFT JOIN empresas_unidas ON empresa_contratista.rut_emp_con = empresas_unidas.rut_emp_con`
    }
    if (tablesList.includes('empresa_principal') && tablesList.includes('empresas_unidas')) {
      query += ` LEFT JOIN empresa_principal ON empresas_unidas.rut_emp_pri = empresa_principal.rut_emp_pri`
    }
    if (tablesList.includes('empresa_subcontratista') && tablesList.includes('empresas_unidas')) {
      query += ` LEFT JOIN empresa_subcontratista ON empresas_unidas.rut_emp_subcon = empresa_subcontratista.rut_emp_subcon`
    }
    if (tablesList.includes('solicitud') && tablesList.includes('empresas_unidas')) {
      query += ` LEFT JOIN solicitud ON empresas_unidas.id_emp_uni = solicitud.id_emp_uni`
    }
    if (tablesList.includes('trabajadores') && tablesList.includes('solicitud')) {
      query += ` LEFT JOIN trabajadores ON solicitud.id_sol = trabajadores.id_sol`
    }
    if (tablesList.includes('periodo') && tablesList.includes('solicitud')) {
      query += ` LEFT JOIN periodo ON solicitud.id_periodo = periodo.id_periodo`
    }

    // Agregar filtros
    if (filters.length > 0) {
      const whereConditions = filters
        .filter((f: any) => f.value)
        .map((f: any) => `${f.column} = '${f.value}'`)
      if (whereConditions.length > 0) {
        query += ` WHERE ${whereConditions.join(' AND ')}`
      }
    }

    const result = await executeQuery(query)
    return NextResponse.json(result)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Error processing request' }, 
      { status: 500 }
    )
  } finally {
    // Asegurar que el pool se cierre correctamente
    await closePool()
  }
}

