import Spinner from "@/components/loader/Spinner";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Usuario } from "@/interfaces/users/response-users.interface";
import { User } from "@/interfaces/users/user.interface";
import { Delete, Edit, Edit2, Trash2 } from "lucide-react";

interface Props {
  usuarios: Usuario[] | undefined;
  isLoading: boolean;
  isError: boolean;
  user: User | null;
}

const TableUsers = ({ usuarios, user, isLoading, isError }: Props) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (!usuarios || usuarios.length === 0 || isError) {
    return (
      <div className="flex justify-center">
        <h1 className="text-xl md:text-3xl font-semibold">
          No se encontraron usuarios dsiponibles en este momento.
        </h1>
      </div>
    );
  }

  return (
    <Table>
      <TableCaption>
        Lista de usuarios Laboratorios Centroamericanos
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center font-bold">Nombre</TableHead>
          <TableHead className="text-center font-bold">
            Correo Electronico
          </TableHead>
          <TableHead className="text-center font-bold">Direccion</TableHead>
          <TableHead className="text-center font-bold">Telefono</TableHead>
          <TableHead className="text-center font-bold">
            Identificacion
          </TableHead>
          <TableHead className="text-center font-bold">Pais</TableHead>
          <TableHead className="text-center font-bold">Sucursal</TableHead>
          <TableHead className="text-center font-bold">Activo</TableHead>
          <TableHead className="text-center font-bold">Autorizado</TableHead>
          <TableHead className="text-center font-bold">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {usuarios.map((usuario: Usuario) => (
          <TableRow key={usuario.id}>
            <TableCell className="text-center">{usuario.name}</TableCell>
            <TableCell className="text-center">{usuario.email}</TableCell>
            <TableCell className="text-center">{usuario.direccion}</TableCell>
            <TableCell className="text-center">{usuario.telefono}</TableCell>
            <TableCell className="text-center">
              {usuario.identificacion}
            </TableCell>
            <TableCell className="text-center">
              {usuario.pais.nombre_pais}
            </TableCell>
            <TableCell className="text-center">
              {usuario.sucursal.nombre}
            </TableCell>
            <TableCell className="text-center">
              {usuario.IsActive === true ? "Si" : "No"}
            </TableCell>
            <TableCell className="text-center">
              {usuario.IsAuthorized === true ? "Si" : "No"}
            </TableCell>
            <TableCell className="text-center">
              <div className="flex justify-center gap-3">
                <Button size={"sm"}>Autorizar</Button>
                <Button size={"sm"}>Activar</Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableUsers;
