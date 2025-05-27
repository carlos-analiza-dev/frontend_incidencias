import { post } from "@/config/axiosInstance";
import { CrearVerificacionAccionAccidente } from "@/interfaces/acciones/create-verificacion-accidente.interface";
import { CrearVerificacionAccionIncidecia } from "@/interfaces/acciones/create-verificacion-incidencia.interface";

export const CrearVerificacionAccionIncidencia = async (
  data: CrearVerificacionAccionIncidecia
) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/verificacion-acciones-incidencia`;
  const response = await post(url, data);
  return response;
};

export const CreateVerificacionAccionAccidente = async (
  data: CrearVerificacionAccionAccidente
) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/verificacion-acciones-accidentes`;
  const response = await post(url, data);
  return response;
};
