import { get } from "@/config/axiosInstance";
import { ResponseVerificacionAccionesIncidencias } from "@/interfaces/acciones/verificaciones-acciones-incidencias.interface";

export const getAccionesVerificadasIncidencias = async (
  id: string,
  limit: number,
  offset: number
) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/verificacion-acciones-incidencia/verificacion/${id}?limit=${limit}&offset=${offset}`;

  try {
    const response = await get<ResponseVerificacionAccionesIncidencias>(url);

    return response;
  } catch (error) {
    throw new Error("Ocurrio un error al obtener las acciones.");
  }
};
