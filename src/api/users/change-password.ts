import { post } from "@/config/axiosInstance";
import { ChangePassword } from "@/interfaces/users/change-password.interface";

export const CambiarContraseña = async (data: ChangePassword) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/change-password`;
  const response = await post(url, data);
  return response;
};
