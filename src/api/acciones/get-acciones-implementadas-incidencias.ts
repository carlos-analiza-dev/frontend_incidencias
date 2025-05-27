import { get } from "@/config/axiosInstance";
import { ResponseAccionesIncidencias } from "@/interfaces/acciones/acciones-incidencias.response.interface";

export const getAccionesImplementadasIncidencias = async (
  id: string,
  limit: number,
  offset: number
) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/implementacion-acciones-incidencias/acciones-implementadas-incidencia/${id}?limit=${limit}&offset=${offset}`;

  try {
    const response = await get<ResponseAccionesIncidencias>(url);

    return response;
  } catch (error) {
    throw new Error("Ocurrio un error al obtener las acciones.");
  }
};
