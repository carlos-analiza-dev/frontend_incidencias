import { get } from "@/config/axiosInstance";
import { PaisesResponse } from "@/interfaces/paises/paises-response.interface";

export const getPaises = async () => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/pais`;
  try {
    const response = await get<PaisesResponse[]>(url);

    return response;
  } catch (error) {
    throw new Error("Ocurrio un error al obtener los paises.");
  }
};
