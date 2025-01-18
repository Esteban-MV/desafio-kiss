import sql from 'mssql'

// Configuración para la conexión a Azure SQL Database
const config = {
  server: process.env.AZURE_SQL_SERVER!,
  database: process.env.AZURE_SQL_DATABASE!,
  user: process.env.AZURE_SQL_USER!,
  password: process.env.AZURE_SQL_PASSWORD!,
  options: {
    encrypt: true, // Requerido para Azure SQL
    trustServerCertificate: false
  }
}

// Mantener una única instancia del pool de conexiones
let pool: sql.ConnectionPool | null = null

// Obtener una conexión del pool, creándola si no existe
export async function getConnection() {
  try {
    if (!pool) {
      pool = await sql.connect(config)
    }
    return pool
  } catch (error) {
    console.error('Error connecting to database:', error)
    throw error
  }
}

// Ejecutar consultas SQL de forma segura
export async function executeQuery(query: string) {
  try {
    const pool = await getConnection()
    const result = await pool.request().query(query)
    return result.recordset
  } catch (error) {
    console.error('Error executing query:', error)
    throw error
  }
}

