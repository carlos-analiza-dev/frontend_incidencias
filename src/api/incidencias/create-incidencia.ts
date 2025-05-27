import { post } from "@/config/axiosInstance";
import { CreateIncidencia } from "@/interfaces/incidencias/create-incidencia.interface";

export const CrearIncidencia = async (data: Partial<CreateIncidencia>) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/incidencias`;
  const response = await post(url, data);
  return response;
};
