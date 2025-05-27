import Spinner from "@/components/loader/Spinner";
import { IncidenciaID } from "@/interfaces/incidencias/get-incidenciasById.interface";
import React from "react";

interface Props {
  incidencia: IncidenciaID | undefined;
  isError: boolean;
  isLoading: boolean;
}

const DetailsIncidencia = ({ incidencia, isError, isLoading }: Props) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (!incidencia || isError) {
    <div className="flex justify-center mt-5">
      <p className="text-xl text-red-600 font-bold">
        No se encontraron detalles
      </p>
    </div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-3 gap-3">
      <div className="flex gap-1">
        <p className="font-bold">Correo:</p>
        <p>{incidencia?.correo}</p>
      </div>
      <div className="flex gap-1">
        <p className="font-bold">Fecha de Incidente:</p>
        <p>{incidencia?.fecha_incidente}</p>
      </div>
      <div className="flex gap-1">
        <p className="font-bold">Sucursal de Incidente:</p>
        <p>{incidencia?.sucursal.nombre}</p>
      </div>
      <div className="flex gap-1">
        <p className="font-bold">Hora de Incidente:</p>
        <p>{incidencia?.hora}</p>
      </div>
    </div>
  );
};

export default DetailsIncidencia;
