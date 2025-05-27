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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import React, { useState } from "react";
import FormAccionesAccidentes from "../acciones_incidencias/FormAccionesAccidentes";
import FormVerificacionAccionesAccidentes from "../acciones_incidencias/FormVerificacionAccionesAccidentes";
import { getAccionesVerificadasAccidentes } from "@/api/acciones/get-acciones-verificadas-accidentes";
import TableVerificacionAcciones from "../acciones_incidencias/TableVerificacionAcciones";

interface Props {
  accidentes: Accidente[] | undefined;
  isLoading: boolean;
  isError: boolean;
  user: User | null;
}

const TableAccidentes = ({ accidentes, isError, isLoading, user }: Props) => {
  const queryClient = useQueryClient();
  const [selectedId, setSelectedId] = useState<string>("");
  const limit = 10;
  const [offset, setOffset] = useState<number>(0);

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

  const {
    data: verificadas,
    isError: ErrorVer,
    isLoading: loading,
  } = useQuery({
    queryKey: ["verificacion-acciones-accidentes", selectedId, limit, offset],
    queryFn: () => getAccionesVerificadasAccidentes(selectedId, limit, offset),
    retry: 0,
    staleTime: 60 * 100 * 5,
  });
  const totalVer = verificadas?.total || 0;

  const handleViewAcciones = (id: string) => {
    setSelectedId(id);
    setOffset(0);
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
          <TableHead className="text-center text-gray-800 font-bold">
            Area del accidente
          </TableHead>
          <TableHead className="text-center text-gray-800 font-bold">
            Descripcion
          </TableHead>

          <TableHead className="text-center text-gray-800 font-bold">
            Categoria
          </TableHead>
          <TableHead className="text-center text-gray-800 font-bold">
            Detalles
          </TableHead>

          {user?.rol === "Administrador" && (
            <TableHead className="text-center text-gray-800 font-bold">
              Ver Acciones
            </TableHead>
          )}
          {(user?.rol === "Administrador" ||
            user?.rol === "Gerente_Sucursal") && (
            <TableHead className="text-center text-gray-800 font-bold">
              Acciones
            </TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {accidentes.map((accidente: Accidente) => (
          <TableRow key={accidente.id}>
            <TableCell className="text-center">{accidente.area}</TableCell>
            <TableCell className="text-center">
              {accidente.descripcion}
            </TableCell>
            <TableCell className="text-center">{accidente.categoria}</TableCell>
            <TableCell className="text-center">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <span
                    onClick={() => {}}
                    className="hover:underline cursor-pointer"
                  >
                    Ver
                  </span>
                </AlertDialogTrigger>
                <AlertDialogContent className="max-w-xl md:max-w-2xl">
                  <div className="flex justify-end">
                    <AlertDialogCancel>X</AlertDialogCancel>
                  </div>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Mas detalles</AlertDialogTitle>
                    <AlertDialogDescription>
                      En esta seccion se pueden observar mas detalles sobre el
                      accidente
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <div>Detalles</div>
                </AlertDialogContent>
              </AlertDialog>
            </TableCell>
            {user?.rol === "Administrador" && (
              <TableCell className="text-center">
                <div className="flex gap-2 justify-center items-center">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <span
                        onClick={() => {}}
                        className="hover:underline cursor-pointer"
                      >
                        Implementadas
                      </span>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="w-full md:max-w-4xl lg:max-w-6xl">
                      <div className="flex justify-end">
                        <AlertDialogCancel>X</AlertDialogCancel>
                      </div>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Historial de acciones
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          En esta seccion podras observar todas las acciones que
                          se han realizado para cada accidente
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <div className="p-3">Tabla</div>
                      <div>Paginacion</div>
                    </AlertDialogContent>
                  </AlertDialog>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <span
                        onClick={() => handleViewAcciones(accidente.id)}
                        className="hover:underline cursor-pointer"
                      >
                        Verificadas
                      </span>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="w-full md:max-w-4xl lg:max-w-6xl">
                      <div className="flex justify-end">
                        <AlertDialogCancel>X</AlertDialogCancel>
                      </div>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Historial de verificacion de acciones
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          En esta seccion podras observar todas las
                          verificaciones de acciones que se han realizado para
                          cada accidente
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <div className="p-3">
                        <TableVerificacionAcciones
                          verificadas={verificadas?.data}
                          cargando={loading}
                          error={ErrorVer}
                        />
                      </div>
                      <div>Paginacion</div>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            )}
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
            {user?.rol === "Gerente_Sucursal" && (
              <TableCell className="flex justify-center gap-3">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size={"sm"}>Implementar Accion</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <div className="flex justify-end">
                      <AlertDialogCancel>X</AlertDialogCancel>
                    </div>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Agregar accion para el accidente ocurrido
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        En esta seccion podras agregar acciones que se tomaran
                        sobre los accidentes ocurridos.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="p-2">
                      <FormAccionesAccidentes
                        user={user}
                        accidente_id={accidente.id}
                      />
                    </div>
                  </AlertDialogContent>
                </AlertDialog>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size={"sm"}>Verificar Accion</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <div className="flex justify-end">
                      <AlertDialogCancel>X</AlertDialogCancel>
                    </div>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Agregar verificacion de accion para el accidente
                        ocurrida
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        En esta seccion podras agregar verificaciones de
                        acciones que se tomaran sobre los accidentes ocurridos.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="p-2">
                      <FormVerificacionAccionesAccidentes
                        user={user}
                        accidente_id={accidente.id}
                      />
                    </div>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableAccidentes;
