import { get } from "@/config/axiosInstance";
import { VerificacionAccionesAccidentesResponse } from "@/interfaces/acciones/verificacion-acciones-accidentes-response.interface";

export const getAccionesVerificadasAccidentes = async (
  id: string,
  limit: number,
  offset: number
) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/verificacion-acciones-accidentes/verificacion/${id}?limit=${limit}&offset=${offset}`;

  try {
    const response = await get<VerificacionAccionesAccidentesResponse>(url);

    return response;
  } catch (error) {
    throw new Error("Ocurrio un error al obtener las acciones.");
  }
};
