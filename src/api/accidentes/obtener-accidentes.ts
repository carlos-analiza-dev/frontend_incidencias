import { get } from "@/config/axiosInstance";
import { AccidenteResID } from "@/interfaces/accidentes/accidenteId-response.interface";
import { ResponseAccidentes } from "@/interfaces/accidentes/accidentes-response.interface";

export const ObtenerAccidentes = async (
  limit: number = 10,
  offset: number = 0
) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/accidentes?limit=${limit}&offset=${offset}`;
  const response = await get<ResponseAccidentes>(url);
  return response;
};

export const ObtenerAccidentesBySucursal = async (
  limit: number = 10,
  offset: number = 0,
  sucursalId: string
) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/accidentes/sucursal/${sucursalId}?limit=${limit}&offset=${offset}`;
  const response = await get<ResponseAccidentes>(url);
  return response;
};

export const ObtenerAccidentesById = async (id: string) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/accidentes/${id}`;
  const response = await get<AccidenteResID>(url);
  return response;
};
