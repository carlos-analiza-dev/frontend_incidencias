export interface ResponseAccidentes {
  data: Accidente[];
  total: number;
  offset: number;
  limit: number;
}

export interface Accidente {
  id: string;
  area: string;
  nombreNotificante: string;
  cargoNotificante: string;
  nombreAfectado: string;
  dniAfectado: string;
  fechaIncidente: string;
  hora: string;
  descripcion: string;
  enPuesto: string;
  laboresHabituales: string;
  detallaParteCuerpo: string;
  usoEPPCompleto: string;
  descripcionEPP: string;
  exigeAtencionJefeLab: string;
  accionTomada: string;
  observaciones: string;
  correo: string;
  fechaReporte: Date;
  categoria: string;
}
