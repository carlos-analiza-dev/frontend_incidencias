export interface ResponseLogin {
  id: string;
  email: string;
  name: string;
  direccion: string;
  telefono: string;
  identificacion: string;
  rol: string;
  IsActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  sucursal: Sucursal;
  area: Area;
  token: string;
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
