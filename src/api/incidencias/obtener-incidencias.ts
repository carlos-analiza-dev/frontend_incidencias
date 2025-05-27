import { get } from "@/config/axiosInstance";
import { IncidenciasResponse } from "@/interfaces/incidencias/response-incidencias.interfaces";

export const GetIncidencias = async (
  limit: number = 10,
  offset: number = 0
) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/incidencias?limit=${limit}&offset=${offset}`;
  const response = await get<IncidenciasResponse>(url);
  return response;
};

export const GetIncidenciasBySucursal = async (
  limit: number = 10,
  offset: number = 0,
  sucursalId: string
) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/incidencias/sucursal/${sucursalId}?limit=${limit}&offset=${offset}`;
  const response = await get<IncidenciasResponse>(url);
  return response;
};
