export interface EmpresaContratista {
  id_emp_con: number
  rut_emp_con: string
  nombre_emp_con: string
  correo_emp_con: string
  status_emp_con: number
}

export interface EmpresaPrincipal {
  id_emp_pri: number
  rut_emp_pri: string
  nombre_emp_pri: string
  correo_emp_pri: string
  status_emp_pri: number
}

export interface EmpresaSubcontratista {
  id_emp_subcon: number
  rut_emp_subcon: string
  nombre_emp_subcon: string
  correo_emp_subcon: string
  status_emp_subcon: number
}

export interface EmpresasUnidas {
  id_emp_uni: number
  rut_emp_pri: string
  rut_emp_con: string
  rut_emp_subcon: string | null
}

export interface Periodo {
  id_periodo: number
  mesanio_periodo: number
  minimo_imponible_periodo: number
  maximo_imponible_periodo: number
  status_periodo: number
}

export interface Solicitud {
  id_sol: number
  id_emp_uni: number
  nombre_contrato_sol: string
  cant_trab_acreditar_sol: number
  total_trab_sol: number
  estado_certificacion_sol: string
  id_periodo: number
}

export interface Trabajador {
  id_trabajador: number
  rut_trabajador: string
  nombre_trabajador: string
  apaterno_trabajador: string
  amaterno_trabajador: string
  id_sol: number
}

