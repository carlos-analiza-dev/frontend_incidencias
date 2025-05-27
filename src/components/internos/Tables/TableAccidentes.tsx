import { ActualizarAccidentes } from "@/api/accidentes/update-accidente";
import Spinner from "@/components/loader/Spinner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { toast } from "@/hooks/use-toast";
import { CreateAccidente } from "@/interfaces/accidentes/accidente-create.interface";
import { Accidente } from "@/interfaces/accidentes/accidentes-response.interface";
import { User } from "@/interfaces/users/user.interface";
import { useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import React from "react";

interface Props {
  accidentes: Accidente[] | undefined;
  isLoading: boolean;
  isError: boolean;
  user: User | null;
}

const TableAccidentes = ({ accidentes, isError, isLoading, user }: Props) => {
  const queryClient = useQueryClient();

  const handleEditCategoria = async (
    id: string,
    data: Partial<CreateAccidente>
  ) => {
    try {
      await ActualizarAccidentes(id, data);
      queryClient.invalidateQueries({ queryKey: ["accidentes-nd"] });
      toast({
        title: "Exito",
        description: "Categoria actualizada exitosamente",
      });
    } catch (error) {
      if (isAxiosError(error)) {
        toast({
          title: "Error",
          description: error.response?.data
            ? error.response?.data.message
            : "Ocurrio un error al momento de actualizar la categoria",
        });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (!accidentes || accidentes.length === 0 || isError) {
    return (
      <div className="flex justify-center items-center">
        <h1 className="text-2xl text-red-600 font-semibold">
          No se encontraron accidentes disponibles en este momento.
        </h1>
      </div>
    );
  }

  return (
    <Table>
      <TableCaption>Lista de accidentes Laboratorios Analiza</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center font-bold text-gray-800">
            Area Accidente
          </TableHead>
          <TableHead className="text-center font-bold text-gray-800">
            Notificante
          </TableHead>
          <TableHead className="text-center font-bold text-gray-800">
            Cargo Notificante
          </TableHead>
          <TableHead className="text-center font-bold text-gray-800">
            Afectado
          </TableHead>
          <TableHead className="text-center font-bold text-gray-800">
            Fecha Accidente
          </TableHead>
          <TableHead className="text-center font-bold text-gray-800">
            Hora
          </TableHead>
          <TableHead className="text-center font-bold text-gray-800">
            Descripcion
          </TableHead>
          <TableHead className="text-center font-bold text-gray-800">
            Categoria
          </TableHead>
          {user?.rol === "Administrador" ||
            (user?.rol === "Gerente_Sucursal" && (
              <TableHead className="text-center font-bold text-gray-800">
                Acciones
              </TableHead>
            ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {accidentes.map((accidente: Accidente) => (
          <TableRow key={accidente.id}>
            <TableCell className="text-center">{accidente.area}</TableCell>
            <TableCell className="text-center">
              {accidente.nombreNotificante}
            </TableCell>
            <TableCell className="text-center">
              {accidente.cargoNotificante}
            </TableCell>
            <TableCell className="text-center">
              {accidente.nombreAfectado}
            </TableCell>
            <TableCell className="text-center">
              {accidente.fechaIncidente}
            </TableCell>
            <TableCell className="text-center">{accidente.hora}</TableCell>
            <TableCell className="text-center">
              {accidente.descripcion}
            </TableCell>
            <TableCell className="text-center">{accidente.categoria}</TableCell>
            {user?.rol === "Administrador" && (
              <TableCell className="text-center">
                <div className="flex justify-center">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size={"sm"}>Categorizar</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <div className="flex justify-end">
                        <AlertDialogCancel>X</AlertDialogCancel>
                      </div>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Categoriza el accidente
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          En esta seccion podras categorizar el accidente: Pre
                          Clinica, Analitica, Post Analitica
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="flex justify-between">
                        <AlertDialogAction
                          onClick={() =>
                            handleEditCategoria(accidente.id, {
                              categoria: "Pre_analitica",
                            })
                          }
                        >
                          Pre Analitica
                        </AlertDialogAction>
                        <AlertDialogAction
                          onClick={() =>
                            handleEditCategoria(accidente.id, {
                              categoria: "Analitica",
                            })
                          }
                        >
                          Analitica
                        </AlertDialogAction>
                        <AlertDialogAction
                          onClick={() =>
                            handleEditCategoria(accidente.id, {
                              categoria: "Post_analitica",
                            })
                          }
                        >
                          Post Analitica
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableAccidentes;
