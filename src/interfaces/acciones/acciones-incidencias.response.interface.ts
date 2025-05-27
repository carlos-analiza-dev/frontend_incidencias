export interface ResponseAccionesIncidencias {
  total: number;
  data: AccionIncidencia[];
}

export interface AccionIncidencia {
  id: string;
  acciones_tomadas: string;
  fecha_limite_implementacion: string;
  fecha_creacion: Date;
  responsable_aplicar_correcciones: ResponsableAplicarCorrecciones;
  usuario_reporta: ResponsableAplicarCorrecciones;
}

export interface ResponsableAplicarCorrecciones {
  id: string;
  email: string;
  name: string;
  direccion: string;
  telefono: string;
  identificacion: string;
  rol: string;
  IsActive: boolean;
  IsAuthorized: boolean;
  createdAt: Date;
  updatedAt: Date;
  pais: Pais;
  sucursal: Sucursal;
  area: Area;
}

export interface Area {
  id: string;
  nombre: string;
  pais: Pais;
}

export interface Pais {
  id: string;
  nombre_pais: string;
  code: string;
  createdAt: Date;
}

export interface Sucursal {
  id: string;
  nombre: string;
  descripcion: string;
  isActive: string;
  createdAd: Date;
}
