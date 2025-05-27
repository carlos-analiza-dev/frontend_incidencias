import { get } from "@/config/axiosInstance";
import { SucursalesResponse } from "@/interfaces/sucursales/response-sucursales";

export const getSucursales = async () => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/sucursales`;
  try {
    const response = await get<SucursalesResponse[]>(url);

    return response;
  } catch (error) {
    throw new Error("Ocurrio un error al obtener las sucursales.");
  }
};
