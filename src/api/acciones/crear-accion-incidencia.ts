import { post } from "@/config/axiosInstance";
import { CreateAccionIncidencia } from "@/interfaces/acciones/create-acciones-indicidencias.interfaces";

export const CrearAccionIncidente = async (data: CreateAccionIncidencia) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/implementacion-acciones-incidencias`;
  const response = await post(url, data);
  return response;
};
