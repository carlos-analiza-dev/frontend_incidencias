export interface AccidenteResID {
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
  sucursal: Sucursal;
}

export interface Sucursal {
  id: string;
  nombre: string;
  descripcion: string;
  isActive: string;
  createdAd: Date;
}
