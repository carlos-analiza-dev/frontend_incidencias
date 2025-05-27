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
import { IncidenciaVerificada } from "@/interfaces/acciones/verificaciones-acciones-incidencias.interface";
import React from "react";

interface Props {
  verificadas: IncidenciaVerificada[] | undefined;
  cargando: boolean;
  error: boolean;
}

const TableVerificacionAcciones = ({ verificadas, cargando, error }: Props) => {
  if (cargando) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (!verificadas || verificadas?.length === 0 || error) {
    return (
      <div className="flex justify-center mt-5">
        <p className="text-xl text-red-600 font-bold">
          No se encontraron verificadas en este momento
        </p>
      </div>
    );
  }

  return (
    <Table>
      <TableCaption>Listado de verificadas realizadas</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center font-bold">Resultado</TableHead>
          <TableHead className="text-center font-bold">
            Fecha de verificacion
          </TableHead>
          <TableHead className="text-center font-bold">
            Responsable de Verificar
          </TableHead>
          <TableHead className="text-center font-bold">Reporta</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {verificadas.map((verificada) => (
          <TableRow key={verificada.id}>
            <TableCell className="text-center">
              {verificada.resultado}
            </TableCell>
            <TableCell className="text-center">
              {verificada.fecha_verificacion}
            </TableCell>
            <TableCell className="text-center">
              {verificada.responsable_aplicar_correcciones.name}
            </TableCell>
            <TableCell className="text-center">
              {verificada.usuario_reporta.name}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableVerificacionAcciones;
