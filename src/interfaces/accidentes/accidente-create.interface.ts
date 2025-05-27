export interface CreateAccidente {
  area: string;
  cargoNotificante: string;
  categoria?: string;
  descripcion: string;
  dniAfectado: string;
  fechaIncidente: string;
  hora: string;
  nombreAfectado: string;
  nombreNotificante: string;
  sucursalId: string;
  accionTomada: string;
  correo: string;
  descripcionEPP: string;
  detallaParteCuerpo: number;
  enPuesto: number;
  exigeAtencionJefeLab: number;
  laboresHabituales: number;
  observaciones: string;
  usoEPPCompleto: number;
}
