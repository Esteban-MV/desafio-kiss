import { NextResponse } from 'next/server'
import { executeQuery, closePool } from '../db'

export async function POST(request: Request) {
  try {
    const { column } = await request.json()
    const [table, field] = column.split('.')
    
    const query = `SELECT DISTINCT ${field} FROM ${table} WHERE ${field} IS NOT NULL`
    const result = await executeQuery(query)
    return NextResponse.json(result.map(row => row[field]))
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

