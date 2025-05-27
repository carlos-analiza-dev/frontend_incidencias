import { post } from "@/config/axiosInstance";
import { CreateAccidente } from "@/interfaces/accidentes/accidente-create.interface";

export const CrearAccidentes = async (data: Partial<CreateAccidente>) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/accidentes`;
  const response = await post(url, data);
  return response;
};
