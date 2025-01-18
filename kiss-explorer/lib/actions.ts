'use server'

import { executeQuery } from './db'

// Función para obtener datos filtrados de las tablas seleccionadas
export async function fetchTableData(columns: string[], filters: { column: string, value: string }[]) {
  try {
    // Extraer tablas únicas de las columnas seleccionadas
    let tables = new Set<string>()
    let selectedColumns = columns.map(col => {
      const [table, field] = col.split('.')
      tables.add(table)
      return `${table}.${field}`
    })

    // Construir la consulta SQL base
    let tablesList = Array.from(tables)
    let query = `SELECT ${selectedColumns.join(', ')} FROM ${tablesList[0]}`

    // Agregar JOINs automáticos basados en las relaciones conocidas
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

    // Agregar condiciones WHERE para los filtros activos
    if (filters.length > 0) {
      const whereConditions = filters
        .filter(f => f.value) // Solo filtros con valores
        .map(f => `${f.column} = '${f.value}'`)
      if (whereConditions.length > 0) {
        query += ` WHERE ${whereConditions.join(' AND ')}`
      }
    }

    // Ejecutar la consulta y retornar resultados
    const data = await executeQuery(query)
    return data

  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

// Función para obtener valores únicos para los filtros
export async function fetchFilterValues(column: string) {
  try {
    const [table, field] = column.split('.')
    // Obtener valores únicos no nulos para el campo seleccionado
    const query = `SELECT DISTINCT ${field} FROM ${table} WHERE ${field} IS NOT NULL`
    const data = await executeQuery(query)
    return data.map(row => row[field])
  } catch (error) {
    console.error('Error fetching filter values:', error)
    throw error
  }
}

