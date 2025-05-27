export interface ResponseAreas {
  area: Area[];
  total: number;
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
