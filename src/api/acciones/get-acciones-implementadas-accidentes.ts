import { get } from "@/config/axiosInstance";
import { ResponseAccionesAccidentes } from "@/interfaces/acciones/acciones-accidentes-response.interface";

export const getAccionesImplementadasAccidentes = async (
  id: string,
  limit: number,
  offset: number
) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/implementacion-acciones-accidentes/acciones/${id}?limit=${limit}&offset=${offset}`;

  try {
    const response = await get<ResponseAccionesAccidentes>(url);

    return response;
  } catch (error) {
    throw new Error("Ocurrio un error al obtener las acciones.");
  }
};
