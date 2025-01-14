import { buildQuery, executeQuery, initializeDatabase } from '@/lib/db'
import { NextResponse } from 'next/server'

// Inicializar la base de datos al arrancar
initializeDatabase().catch(console.error)

export async function POST(request: Request) {
  try {
    const { columns, filters } = await request.json()

    if (!columns || columns.length === 0) {
      return NextResponse.json({ data: [] })
    }

    const { query, params } = buildQuery(columns, filters)
    const data = await executeQuery(query, params)
    
    return NextResponse.json({ data })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Error al obtener los datos' }, 
      { status: 500 }
    )
  }
}

