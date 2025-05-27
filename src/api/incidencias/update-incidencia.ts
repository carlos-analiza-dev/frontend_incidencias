import { patch } from "@/config/axiosInstance";
import { CreateIncidencia } from "@/interfaces/incidencias/create-incidencia.interface";

export const ActualizarIncidencia = async (
  id: string,
  data: Partial<CreateIncidencia>
) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/incidencias/${id}`;
  const response = await patch(url, data);
  return response;
};
