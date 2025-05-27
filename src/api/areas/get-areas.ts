import { get } from "@/config/axiosInstance";
import { ResponseAreas } from "@/interfaces/areas/response-areas.interface";

export const ObtenerAreas = async (limit?: number, offset?: number) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/area?limit=${limit}&offset=${offset}`;
  const response = await get<ResponseAreas>(url);
  return response;
};

export const GetAreas = async () => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/area`;
  const response = await get<ResponseAreas>(url);
  return response;
};
