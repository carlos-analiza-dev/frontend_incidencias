export interface ResponseUsers {
  usuarios: Usuario[];
  total: number;
}

export interface Usuario {
  id: string;
  email: string;
  password: string;
  name: string;
  direccion: string;
  telefono: string;
  identificacion: string;
  rol: string;
  IsActive: boolean;
  IsAuthorized: boolean;
  createdAt: Date;
  updatedAt: Date;
  sucursal: Sucursal;
  pais: Pais;
  area: Area;
}

export interface Area {
  id: string;
  nombre: string;
  pais: Pais;
}

export interface Pais {
  id: string;
  nombre_pais: NombrePais;
  code: Code;
  createdAt: Date;
}

export enum Code {
  Hn = "HN",
}

export enum NombrePais {
  Honduras = "Honduras",
}

export interface Sucursal {
  id: string;
  nombre: string;
  descripcion: string;
  isActive: string;
  createdAd: Date;
}
