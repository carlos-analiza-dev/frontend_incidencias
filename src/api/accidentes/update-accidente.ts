import { patch } from "@/config/axiosInstance";
import { CreateAccidente } from "@/interfaces/accidentes/accidente-create.interface";

export const ActualizarAccidentes = async (
  id: string,
  data: Partial<CreateAccidente>
) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/accidentes/${id}`;
  const response = await patch(url, data);
  return response;
};
