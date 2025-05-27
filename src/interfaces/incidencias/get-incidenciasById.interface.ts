export interface IncidenciaID {
  id: string;
  area: string;
  fecha_incidente: string;
  hora: string;
  descripcion: string;
  categoria: string;
  correo: string;
  fecha_reporte: Date;
  sucursal: Sucursal;
}

export interface Sucursal {
  id: string;
  nombre: string;
  descripcion: string;
  isActive: string;
  createdAd: Date;
}
