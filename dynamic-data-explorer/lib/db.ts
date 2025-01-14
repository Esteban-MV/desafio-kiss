import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { tableRelations } from '@/config/database'

let dbPromise: Promise<any>

async function getDb() {
  if (!dbPromise) {
    dbPromise = open({
      filename: './data.db',
      driver: sqlite3.Database
    })
  }
  return dbPromise
}

export async function executeQuery(query: string, params: any[] = []) {
  const db = await getDb()
  try {
    return await db.all(query, params)
  } catch (error) {
    console.error('Database error:', error)
    throw error
  }
}

export async function initializeDatabase() {
  const db = await getDb()
  
  // Crear las tablas
  await db.exec(`
    CREATE TABLE IF NOT EXISTS empresa_contratista (
      id_emp_con INTEGER PRIMARY KEY AUTOINCREMENT,
      rut_emp_con TEXT UNIQUE NOT NULL,
      nombre_emp_con TEXT NOT NULL,
      correo_emp_con TEXT NOT NULL,
      status_emp_con INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS empresa_principal (
      id_emp_pri INTEGER PRIMARY KEY AUTOINCREMENT,
      rut_emp_pri TEXT UNIQUE NOT NULL,
      nombre_emp_pri TEXT NOT NULL,
      correo_emp_pri TEXT NOT NULL,
      status_emp_pri INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS empresa_subcontratista (
      id_emp_subcon INTEGER PRIMARY KEY AUTOINCREMENT,
      rut_emp_subcon TEXT UNIQUE NOT NULL,
      nombre_emp_subcon TEXT NOT NULL,
      correo_emp_subcon TEXT NOT NULL,
      status_emp_subcon INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS empresas_unidas (
      id_emp_uni INTEGER PRIMARY KEY AUTOINCREMENT,
      rut_emp_pri TEXT NOT NULL,
      rut_emp_con TEXT NOT NULL,
      rut_emp_subcon TEXT,
      FOREIGN KEY (rut_emp_pri) REFERENCES empresa_principal(rut_emp_pri),
      FOREIGN KEY (rut_emp_con) REFERENCES empresa_contratista(rut_emp_con),
      FOREIGN KEY (rut_emp_subcon) REFERENCES empresa_subcontratista(rut_emp_subcon)
    );

    CREATE TABLE IF NOT EXISTS periodo (
      id_periodo INTEGER PRIMARY KEY AUTOINCREMENT,
      mesanio_periodo INTEGER NOT NULL,
      minimo_imponible_periodo INTEGER NOT NULL,
      maximo_imponible_periodo INTEGER NOT NULL,
      status_periodo INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS solicitud (
      id_sol INTEGER PRIMARY KEY AUTOINCREMENT,
      id_emp_uni INTEGER NOT NULL,
      nombre_contrato_sol TEXT NOT NULL,
      cant_trab_acreditar_sol INTEGER NOT NULL,
      total_trab_sol INTEGER NOT NULL,
      estado_certificacion_sol TEXT NOT NULL,
      id_periodo INTEGER NOT NULL,
      FOREIGN KEY (id_emp_uni) REFERENCES empresas_unidas(id_emp_uni),
      FOREIGN KEY (id_periodo) REFERENCES periodo(id_periodo)
    );

    CREATE TABLE IF NOT EXISTS trabajadores (
      id_trabajador INTEGER PRIMARY KEY AUTOINCREMENT,
      rut_trabajador TEXT NOT NULL,
      nombre_trabajador TEXT NOT NULL,
      apaterno_trabajador TEXT NOT NULL,
      amaterno_trabajador TEXT NOT NULL,
      id_sol INTEGER NOT NULL,
      FOREIGN KEY (id_sol) REFERENCES solicitud(id_sol)
    );
  `)

  // Insertar datos de ejemplo si las tablas están vacías
  const count = await db.get('SELECT COUNT(*) as count FROM empresa_principal')
  if (count.count === 0) {
    await db.exec(`
      INSERT INTO empresa_principal (rut_emp_pri, nombre_emp_pri, correo_emp_pri, status_emp_pri) VALUES
      ('11111111-1', 'Empresa Prueba', 'prueba@prueba.cl', 1),
      ('11111112-1', 'Empresa Prueba Ecommerce', 'eco@prueba.cl', 1);

      INSERT INTO empresa_contratista (rut_emp_con, nombre_emp_con, correo_emp_con, status_emp_con) VALUES
      ('22222222-2', 'Empresa Contratista Sofía', 'sofia@sof.cl', 1),
      ('22222223-2', 'Empresa Contratista Gerencia', 'gerencia@gen.cl', 1);

      INSERT INTO empresa_subcontratista (rut_emp_subcon, nombre_emp_subcon, correo_emp_subcon, status_emp_subcon) VALUES
      ('33333333-3', 'PRUEBA SUB CONTRATISTA SODIMAC', 'sodimac@sodimac.cl', 1);

      INSERT INTO empresas_unidas (rut_emp_pri, rut_emp_con, rut_emp_subcon) VALUES
      ('11111111-1', '22222222-2', NULL),
      ('11111111-1', '22222223-2', '33333333-3');

      INSERT INTO periodo (mesanio_periodo, minimo_imponible_periodo, maximo_imponible_periodo, status_periodo) VALUES
      (202410, 500000, 3195847, 1);

      INSERT INTO solicitud (id_emp_uni, nombre_contrato_sol, cant_trab_acreditar_sol, total_trab_sol, estado_certificacion_sol, id_periodo) VALUES
      (1, 'NOMBRE PROYECTO 1', 5, 5, 'Certificado', 1);

      INSERT INTO trabajadores (rut_trabajador, nombre_trabajador, apaterno_trabajador, amaterno_trabajador, id_sol) VALUES
      ('12345678-9', 'Juan', 'Pérez', 'Gómez', 1),
      ('23456789-0', 'Pedro', 'López', 'Rodríguez', 1);
    `)
  }
}

export function buildQuery(columns: string[], filters: { column: string; value: string }[]) {
  const tables = new Set<string>()
  const joins: string[] = []
  const whereConditions: string[] = []
  const params: any[] = []

  // Collect all required tables
  columns.forEach(column => {
    const [table] = column.split('.')
    tables.add(table)
  })

  filters.forEach(filter => {
    const [table] = filter.column.split('.')
    tables.add(table)
    whereConditions.push(`${filter.column} = ?`)
    params.push(filter.value)
  })

  // Build joins based on table relationships
  const addedJoins = new Set<string>()
  const tablesArray = Array.from(tables)

  tablesArray.forEach(table => {
    tableRelations.forEach(relation => {
      if ((tables.has(relation.from) && tables.has(relation.to)) ||
          (relation.from === table || relation.to === table)) {
        const joinKey = `${relation.from}_${relation.to}`
        if (!addedJoins.has(joinKey)) {
          joins.push(`LEFT JOIN ${relation.to} ON ${relation.from}.${relation.fromKey} = ${relation.to}.${relation.toKey}`)
          addedJoins.add(joinKey)
        }
      }
    })
  })

  const mainTable = tablesArray[0]
  const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : ''

  return {
    query: `
      SELECT ${columns.join(', ')}
      FROM ${mainTable}
      ${joins.join(' ')}
      ${whereClause}
    `,
    params
  }
}

