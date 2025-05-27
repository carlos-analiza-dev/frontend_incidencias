import { post } from "@/config/axiosInstance";
import { CreateAccionAccidente } from "@/interfaces/acciones/create-acciones-accidentes.interface";

export const CrearAccionAccidente = async (data: CreateAccionAccidente) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/implementacion-acciones-accidentes`;
  const response = await post(url, data);
  return response;
};
