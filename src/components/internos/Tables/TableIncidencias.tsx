import { ActualizarIncidencia } from "@/api/incidencias/update-incidencia";
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
import { CreateIncidencia } from "@/interfaces/incidencias/create-incidencia.interface";
import { Incidencia } from "@/interfaces/incidencias/response-incidencias.interfaces";
import { User } from "@/interfaces/users/user.interface";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import FormAcciones from "../acciones_incidencias/FormAcciones";
import { getAccionesImplementadasIncidencias } from "@/api/acciones/get-acciones-implementadas-incidencias";
import TableAccionesIncidencia from "../acciones_incidencias/TableAccionesIncidencia";
import { useState } from "react";
import PaginacionAccionesIdicencias from "../acciones_incidencias/PaginacionAccionesIdicencias";
import FormVerificacionAccionesIncidencias from "../acciones_incidencias/FormVerificacionAccionesIncidencias";
import TableVerificacionAcciones from "../acciones_incidencias/TableVerificacionAcciones";
import { getAccionesVerificadasIncidencias } from "@/api/acciones/get-acciones-verificadas-incidencias";
import PaginacionAccionesVerificadasIncidencia from "../acciones_incidencias/PaginacionAccionesVerificadasIncidencia";
import DetailsIncidencia from "../incidencias/DetailsIncidencia";
import { GetIncidenciasById } from "@/api/incidencias/obtener-incidencias";

interface Props {
  incidencias: Incidencia[] | undefined;
  isLoading: boolean;
  isError: boolean;
  user: User | null;
}

const TableIncidentes = ({ incidencias, isError, isLoading, user }: Props) => {
  const queryClient = useQueryClient();
  const [selectedId, setSelectedId] = useState<string>("");

  const limit = 10;
  const [offset, setOffset] = useState<number>(0);

  const handleEditCategoria = async (
    id: string,
    data: Partial<CreateIncidencia>
  ) => {
    try {
      await ActualizarIncidencia(id, data);
      queryClient.invalidateQueries({ queryKey: ["incidencias-nd"] });
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
    data: acciones,
    isError: Error,
    isLoading: cargando,
  } = useQuery({
    queryKey: ["acciones-incidencias", selectedId, limit, offset],
    queryFn: () =>
      getAccionesImplementadasIncidencias(selectedId, limit, offset),
    retry: 0,
    staleTime: 60 * 100 * 5,
  });

  const {
    data: verificadas,
    isError: ErrorVer,
    isLoading: loading,
  } = useQuery({
    queryKey: ["verificacion-acciones-incidencias", selectedId, limit, offset],
    queryFn: () => getAccionesVerificadasIncidencias(selectedId, limit, offset),
    retry: 0,
    staleTime: 60 * 100 * 5,
  });

  const {
    data: incidenciaId,
    isError: ErrorId,
    isLoading: loadingIn,
  } = useQuery({
    queryKey: ["inicidencias-id", selectedId],
    queryFn: () => GetIncidenciasById(selectedId),
    retry: 0,
    staleTime: 60 * 100 * 5,
  });

  const handleViewAcciones = (id: string) => {
    setSelectedId(id);
    setOffset(0);
  };

  const handleClose = () => {
    setSelectedId("");
    setOffset(0);
  };

  const total = acciones?.total || 0;
  const totalVer = verificadas?.total || 0;

  const handleNext = () => {
    if (offset + limit < total) {
      setOffset((prev) => prev + limit);
    }
  };

  const handlePrev = () => {
    setOffset((prev) => Math.max(prev - limit, 0));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (!incidencias || incidencias.length === 0 || isError) {
    return (
      <div className="flex justify-center">
        <h1 className="text-xl md:text-3xl font-semibold">
          No se encontraron incidencias dsiponibles en este momento.
        </h1>
      </div>
    );
  }

  return (
    <Table>
      <TableCaption>Listado de incidencias.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center text-gray-800 font-bold">
            Area del incidente
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
        {incidencias.map((incidencia: Incidencia) => (
          <TableRow key={incidencia.id}>
            <TableCell className="text-center">{incidencia.area}</TableCell>
            <TableCell className="text-center">
              {incidencia.descripcion}
            </TableCell>

            <TableCell className="text-center">
              {incidencia.categoria}
            </TableCell>
            <TableCell className="text-center">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <span
                    onClick={() => handleViewAcciones(incidencia.id)}
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
                      En esta seccion se pueden observar mas detalles sobre la
                      incidencia
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <div>
                    <DetailsIncidencia
                      incidencia={incidenciaId}
                      isError={ErrorId}
                      isLoading={loadingIn}
                    />
                  </div>
                </AlertDialogContent>
              </AlertDialog>
            </TableCell>
            {user?.rol === "Administrador" && (
              <TableCell className="text-center">
                <div className="flex gap-2 justify-center items-center">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <span
                        onClick={() => handleViewAcciones(incidencia.id)}
                        className="hover:underline cursor-pointer"
                      >
                        Implementadas
                      </span>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="w-full md:max-w-4xl lg:max-w-6xl">
                      <div className="flex justify-end">
                        <AlertDialogCancel onClick={handleClose}>
                          X
                        </AlertDialogCancel>
                      </div>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Historial de acciones
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          En esta seccion podras observar todas las acciones que
                          se han realizado para cada incidencia
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <div className="p-3">
                        <TableAccionesIncidencia
                          acciones={acciones?.data}
                          cargando={cargando}
                          error={Error}
                        />
                      </div>
                      <PaginacionAccionesIdicencias
                        offset={offset}
                        handlePrev={handlePrev}
                        limit={limit}
                        total={total}
                        handleNext={handleNext}
                      />
                    </AlertDialogContent>
                  </AlertDialog>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <span
                        onClick={() => handleViewAcciones(incidencia.id)}
                        className="hover:underline cursor-pointer"
                      >
                        Verificadas
                      </span>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="w-full md:max-w-4xl lg:max-w-6xl">
                      <div className="flex justify-end">
                        <AlertDialogCancel onClick={handleClose}>
                          X
                        </AlertDialogCancel>
                      </div>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Historial de verificacion de acciones
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          En esta seccion podras observar todas las
                          verificaciones de acciones que se han realizado para
                          cada incidencia
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <div className="p-3">
                        <TableVerificacionAcciones
                          verificadas={verificadas?.data}
                          cargando={loading}
                          error={ErrorVer}
                        />
                      </div>
                      <PaginacionAccionesVerificadasIncidencia
                        offset={offset}
                        handlePrev={handlePrev}
                        limit={limit}
                        total={totalVer}
                        handleNext={handleNext}
                      />
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
                          Categoriza el incidente
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          En esta seccion podras categorizar el incidente: Pre
                          Clinica, Analitica, Post Analitica
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="flex justify-between">
                        <AlertDialogAction
                          onClick={() =>
                            handleEditCategoria(incidencia.id, {
                              categoria: "Pre_analitica",
                            })
                          }
                        >
                          Pre Analitica
                        </AlertDialogAction>
                        <AlertDialogAction
                          onClick={() =>
                            handleEditCategoria(incidencia.id, {
                              categoria: "Analitica",
                            })
                          }
                        >
                          Analitica
                        </AlertDialogAction>
                        <AlertDialogAction
                          onClick={() =>
                            handleEditCategoria(incidencia.id, {
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
                        Agregar accion para la incidencia ocurrida
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        En esta seccio podras agregar acciones que se tomaran
                        sobre las incidencias ocurridas.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="p-2">
                      <FormAcciones
                        user={user}
                        incindencia_id={incidencia.id}
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
                        Agregar verificacion de accion para la incidencia
                        ocurrida
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        En esta seccio podras agregar verificaciones de acciones
                        que se tomaran sobre las incidencias ocurridas.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="p-2">
                      <FormVerificacionAccionesIncidencias
                        user={user}
                        incindencia_id={incidencia.id}
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

export default TableIncidentes;
