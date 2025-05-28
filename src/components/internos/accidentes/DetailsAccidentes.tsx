import Spinner from "@/components/loader/Spinner";
import { Separator } from "@/components/ui/separator";
import { AccidenteResID } from "@/interfaces/accidentes/accidenteId-response.interface";
import React from "react";

interface Props {
  accidente: AccidenteResID | undefined;
  isError: boolean;
  isLoading: boolean;
}

const DetailsAccidentes = ({ accidente, isError, isLoading }: Props) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (!accidente || isError) {
    <div className="flex justify-center mt-5">
      <p className="text-xl text-red-600 font-bold">
        No se encontraron detalles
      </p>
    </div>;
  }
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 p-3 gap-3">
        <div className="flex items-center gap-1">
          <p className="font-bold">Nombre Notificante:</p>
          <p>{accidente?.nombreNotificante}</p>
        </div>
        <div className="flex items-center gap-1">
          <p className="font-bold">Cargo Notificante:</p>
          <p>{accidente?.cargoNotificante}</p>
        </div>
        <div className="flex items-center gap-1">
          <p className="font-bold">Nombre Afectado:</p>
          <p>{accidente?.nombreAfectado}</p>
        </div>
        <div className="flex items-center gap-1">
          <p className="font-bold">DNI Notificante:</p>
          <p>{accidente?.dniAfectado}</p>
        </div>
        <div className="flex items-center gap-1">
          <p className="font-bold">Fecha de Accidente:</p>
          <p>{accidente?.fechaIncidente}</p>
        </div>
        <div className="flex items-center gap-1">
          <p className="font-bold">Sucursal de Accidente:</p>
          <p>{accidente?.sucursal.nombre}</p>
        </div>
        <div className="flex items-center gap-1">
          <p className="font-bold">Hora de Accidente:</p>
          <p>{accidente?.hora}</p>
        </div>
      </div>
      <Separator />
      <div className="flex justify-center mt-4">
        <p className="text-gray-800 text-xl font-bold">Reporte</p>
      </div>
      <div className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 p-3 gap-3">
          <div className="flex items-center gap-1">
            <p className="font-bold">Estaba en su puesto de trabajo:</p>
            <p>{accidente?.enPuesto === "1" ? "Si" : "No"}</p>
          </div>
          <div className="flex items-center gap-1">
            <p className="font-bold">Hacia labores habituales :</p>
            <p>{accidente?.laboresHabituales === "1" ? "Si" : "No"}</p>
          </div>
          <div className="flex items-center gap-1">
            <p className="font-bold">Detalla la parte del cuerpo afectada :</p>
            <p>{accidente?.detallaParteCuerpo === "1" ? "Si" : "No"}</p>
          </div>
          <div className="flex items-center gap-1">
            <p className="font-bold">
              Equipo de protección personal completo :
            </p>
            <p>{accidente?.usoEPPCompleto === "1" ? "Si" : "No"}</p>
          </div>
          <div className="flex items-center gap-1">
            <p className="font-bold">Describa el EPP, que utilizaba :</p>
            <p>
              {accidente?.descripcionEPP
                ? accidente.descripcionEPP
                : "No definida"}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <p className="font-bold">
              Exige la atención inmediata del Jefe de Laboratorio:
            </p>
            <p>{accidente?.exigeAtencionJefeLab === "1" ? "Si" : "No"}</p>
          </div>
          <div className="block items-center gap-1">
            <p className="font-bold">
              Acción inmediata de quien recibe la notificación del incidente:
            </p>
            <p>
              {accidente?.accionTomada ? accidente.accionTomada : "No definida"}
            </p>
          </div>
          <div className="block items-center gap-1">
            <p className="font-bold">
              Observaciones, ¿porque sucedió? resultados investigación:
            </p>
            <p>
              {accidente?.observaciones
                ? accidente.observaciones
                : "No definida"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsAccidentes;
