import { post } from "@/config/axiosInstance";
import { CreateUser } from "@/interfaces/users/register-user.interface";

export const RegistrarUsuario = async (data: CreateUser) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`;
  const response = await post(url, data);
  return response;
};
