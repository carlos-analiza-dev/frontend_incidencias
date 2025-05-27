import { get } from "@/config/axiosInstance";
import {
  ResponseUsers,
  Usuario,
} from "@/interfaces/users/response-users.interface";

export const ObtenerUsuarios = async (
  limit: number,
  offset: number,
  pais?: string,
  sucursal?: string
) => {
  const params = new URLSearchParams();

  params.append("limit", limit.toString());
  params.append("offset", offset.toString());

  if (pais?.trim()) params.append("pais", pais);
  if (sucursal?.trim()) params.append("sucursal", sucursal);

  const url = `${
    process.env.NEXT_PUBLIC_BACKEND_URL
  }/auth/users?${params.toString()}`;

  const response = await get<ResponseUsers>(url);
  return response;
};

export const SearchUsuarios = async (searchTerm: string) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/seacrh-users?name=${searchTerm}`;

  const response = await get<Usuario[]>(url);
  return response;
};
