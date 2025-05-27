export interface IncidenciasResponse {
  incidencias: Incidencia[];
  total: number;
  limit: number;
  offset: number;
}

export interface Incidencia {
  id: string;
  area: string;
  fecha_incidente: string;
  hora: string;
  descripcion: string;
  categoria: string;
  correo: string;
  fecha_reporte: Date;
}
