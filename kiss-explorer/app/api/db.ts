import sql from 'mssql'

// Configuración de la conexión con retry y timeout
const config: sql.config = {
  server: process.env.AZURE_SQL_SERVER!,
  database: process.env.AZURE_SQL_DATABASE!,
  user: process.env.AZURE_SQL_USER!,
  password: process.env.AZURE_SQL_PASSWORD!,
  options: {
    encrypt: true,
    trustServerCertificate: false,
    enableArithAbort: true,
    connectTimeout: 30000, // 30 segundos
    requestTimeout: 30000,
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    }
  }
}

// Pool global para reutilización de conexiones
let globalPool: sql.ConnectionPool | null = null

export async function getConnection(): Promise<sql.ConnectionPool> {
  try {
    if (globalPool) {
      // Verificar si la conexión está viva
      try {
        await globalPool.request().query('SELECT 1')
        return globalPool
      } catch (error) {
        console.log('Connection dead, creating new one')
        await globalPool.close()
        globalPool = null
      }
    }

    // Crear nueva conexión con retry
    let retries = 3
    while (retries > 0) {
      try {
        globalPool = await sql.connect(config)
        await globalPool.request().query('SELECT 1') // Test query
        return globalPool
      } catch (error) {
        retries--
        if (retries === 0) throw error
        await new Promise(resolve => setTimeout(resolve, 1000)) // Esperar 1 segundo antes de reintentar
      }
    }

    throw new Error('Failed to connect after retries')
  } catch (error) {
    console.error('Database connection error:', error)
    throw new Error('Database connection failed')
  }
}

export async function closePool() {
  if (globalPool) {
    await globalPool.close()
    globalPool = null
  }
}

export async function executeQuery<T>(query: string): Promise<T[]> {
  let pool: sql.ConnectionPool | null = null
  try {
    pool = await getConnection()
    const result = await pool.request().query(query)
    return result.recordset
  } catch (error) {
    console.error('Query execution error:', error)
    throw new Error('Query execution failed')
  }
}

