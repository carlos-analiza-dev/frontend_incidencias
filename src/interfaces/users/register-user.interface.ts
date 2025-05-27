export interface CreateUser {
  email: string;
  password: string;
  identificacion: string;
  confirmPassword?: string;
  name: string;
  telefono: string;
  direccion: string;
  pais: string;
  sucursal: string;
  area: string;
}
