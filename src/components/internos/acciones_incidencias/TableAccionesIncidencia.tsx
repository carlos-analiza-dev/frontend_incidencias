import Spinner from "@/components/loader/Spinner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AccionIncidencia } from "@/interfaces/acciones/acciones-incidencias.response.interface";
import React from "react";

interface Props {
  acciones: AccionIncidencia[] | undefined;
  cargando: boolean;
  error: boolean;
}

const TableAccionesIncidencia = ({ acciones, cargando, error }: Props) => {
  if (cargando) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (!acciones || acciones?.length === 0 || error) {
    return (
      <div className="flex justify-center mt-5">
        <p className="text-xl text-red-600 font-bold">
          No se encontraron acciones en este momento
        </p>
      </div>
    );
  }

  return (
    <Table>
      <TableCaption>Listado de acciones realizadas</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center font-bold">Acciones</TableHead>
          <TableHead className="text-center font-bold">Fecha limite</TableHead>
          <TableHead className="text-center font-bold">Responsable</TableHead>
          <TableHead className="text-center font-bold">Reporta</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {acciones.map((accion) => (
          <TableRow key={accion.id}>
            <TableCell className="text-center">
              {accion.acciones_tomadas}
            </TableCell>
            <TableCell className="text-center">
              {accion.fecha_limite_implementacion}
            </TableCell>
            <TableCell className="text-center">
              {accion.responsable_aplicar_correcciones.name}
            </TableCell>
            <TableCell className="text-center">
              {accion.usuario_reporta.name}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableAccionesIncidencia;
