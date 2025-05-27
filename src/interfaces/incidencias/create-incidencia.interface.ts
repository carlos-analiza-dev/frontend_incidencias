export interface CreateIncidencia {
  area: string;
  fecha_incidente: string;
  hora: string;
  descripcion: string;
  sucursalId: string;
  correo?: string;
  categoria?: string;
}
