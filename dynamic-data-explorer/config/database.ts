export const tableConfig = {
  empresa_contratista: {
    name: 'Empresa Contratista',
    fields: [
      { key: 'id_emp_con', label: 'ID' },
      { key: 'rut_emp_con', label: 'RUT' },
      { key: 'nombre_emp_con', label: 'Nombre' },
      { key: 'correo_emp_con', label: 'Correo' },
      { key: 'status_emp_con', label: 'Estado' }
    ]
  },
  empresa_principal: {
    name: 'Empresa Principal',
    fields: [
      { key: 'id_emp_pri', label: 'ID' },
      { key: 'rut_emp_pri', label: 'RUT' },
      { key: 'nombre_emp_pri', label: 'Nombre' },
      { key: 'correo_emp_pri', label: 'Correo' },
      { key: 'status_emp_pri', label: 'Estado' }
    ]
  },
  empresa_subcontratista: {
    name: 'Empresa Subcontratista',
    fields: [
      { key: 'id_emp_subcon', label: 'ID' },
      { key: 'rut_emp_subcon', label: 'RUT' },
      { key: 'nombre_emp_subcon', label: 'Nombre' },
      { key: 'correo_emp_subcon', label: 'Correo' },
      { key: 'status_emp_subcon', label: 'Estado' }
    ]
  },
  empresas_unidas: {
    name: 'Empresas Unidas',
    fields: [
      { key: 'id_emp_uni', label: 'ID' },
      { key: 'rut_emp_pri', label: 'RUT Principal' },
      { key: 'rut_emp_con', label: 'RUT Contratista' },
      { key: 'rut_emp_subcon', label: 'RUT Subcontratista' }
    ]
  },
  periodo: {
    name: 'Periodo',
    fields: [
      { key: 'id_periodo', label: 'ID' },
      { key: 'mesanio_periodo', label: 'Mes/Año' },
      { key: 'minimo_imponible_periodo', label: 'Mínimo Imponible' },
      { key: 'maximo_imponible_periodo', label: 'Máximo Imponible' },
      { key: 'status_periodo', label: 'Estado' }
    ]
  },
  solicitud: {
    name: 'Solicitud',
    fields: [
      { key: 'id_sol', label: 'ID' },
      { key: 'id_emp_uni', label: 'ID Empresas Unidas' },
      { key: 'nombre_contrato_sol', label: 'Nombre Contrato' },
      { key: 'cant_trab_acreditar_sol', label: 'Trabajadores a Acreditar' },
      { key: 'total_trab_sol', label: 'Total Trabajadores' },
      { key: 'estado_certificacion_sol', label: 'Estado Certificación' },
      { key: 'id_periodo', label: 'ID Periodo' }
    ]
  },
  trabajadores: {
    name: 'Trabajadores',
    fields: [
      { key: 'id_trabajador', label: 'ID' },
      { key: 'rut_trabajador', label: 'RUT' },
      { key: 'nombre_trabajador', label: 'Nombre' },
      { key: 'apaterno_trabajador', label: 'Apellido Paterno' },
      { key: 'amaterno_trabajador', label: 'Apellido Materno' },
      { key: 'id_sol', label: 'ID Solicitud' }
    ]
  }
}

export const tableRelations = [
  {
    from: 'trabajadores',
    to: 'solicitud',
    fromKey: 'id_sol',
    toKey: 'id_sol'
  },
  {
    from: 'solicitud',
    to: 'empresas_unidas',
    fromKey: 'id_emp_uni',
    toKey: 'id_emp_uni'
  },
  {
    from: 'empresas_unidas',
    to: 'empresa_principal',
    fromKey: 'rut_emp_pri',
    toKey: 'rut_emp_pri'
  },
  {
    from: 'empresas_unidas',
    to: 'empresa_contratista',
    fromKey: 'rut_emp_con',
    toKey: 'rut_emp_con'
  },
  {
    from: 'empresas_unidas',
    to: 'empresa_subcontratista',
    fromKey: 'rut_emp_subcon',
    toKey: 'rut_emp_subcon'
  }
]

