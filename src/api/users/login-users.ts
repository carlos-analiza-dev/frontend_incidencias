import { post } from "@/config/axiosInstance";
import { ResponseLogin } from "@/interfaces/users/login-response-user.interface";

import { LoginUser } from "@/interfaces/users/login-user.interface";

export const LoginUsuario = async (data: LoginUser) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`;
  const response = await post<ResponseLogin>(url, data);
  return response;
};
