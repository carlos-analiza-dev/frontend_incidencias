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
import { Area } from "@/interfaces/areas/response-areas.interface";
import { User } from "@/interfaces/users/user.interface";
import React from "react";

interface Props {
  areas: Area[] | undefined;
  isLoading: boolean;
  isError: boolean;
  user: User | null;
}

const TableAreas = ({ areas, isError, isLoading, user }: Props) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (!areas || areas.length === 0 || isError) {
    return (
      <div className="flex justify-center">
        <h1 className="text-xl md:text-3xl font-semibold">
          No se encontraron areas dsiponibles en este momento.
        </h1>
      </div>
    );
  }

  return (
    <Table>
      <TableCaption>
        Listado de areas de Laboratorios Centroamericanos
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center font-bold">Nombre Area</TableHead>
          <TableHead className="text-center font-bold">Pais</TableHead>
          <TableHead className="text-center font-bold">Code</TableHead>
          <TableHead className="text-center font-bold">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {areas?.map((area: Area) => (
          <TableRow key={area.id}>
            <TableCell className="text-center">{area.nombre}</TableCell>
            <TableCell className="text-center">
              {area.pais.nombre_pais}
            </TableCell>
            <TableCell className="text-center">{area.pais.code}</TableCell>
            <TableCell>
              <div className="flex justify-center gap-3">
                <p>Agregar</p>
                <p>Editar</p>
                <p>Eliminar</p>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableAreas;
