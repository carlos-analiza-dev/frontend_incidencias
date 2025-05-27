export interface User {
  id: string;
  email: string;
  name: string;
  direccion: string;
  telefono: string;
  identificacion: string;
  rol: string;
  sucursal: Sucursal;
  area: Area;
  IsActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Area {
  id: string;
  nombre: string;
}

export interface Sucursal {
  id: string;
  nombre: string;
  descripcion: string;
  isActive: string;
  createdAd: Date;
}
