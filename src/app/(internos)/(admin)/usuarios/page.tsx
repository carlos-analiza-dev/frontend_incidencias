"use client";
import { ObtenerUsuarios } from "@/api/users/get-users";
import { useAuthStore } from "@/stores/auth/auth-store";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeftToLine, ArrowRightToLine } from "lucide-react";
import React, { useEffect, useState } from "react";
import TableUsers from "./components/TableUsers";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getPaises } from "@/api/paises/get-paises";
import { getSucursales } from "@/api/sucursales/getSucursales";
import { RoleGuard } from "@/components/protected/RoleGuard";

const UsuariosPage = () => {
  const { user } = useAuthStore();
  const limit = 10;
  const [offset, setOffset] = useState<number>(0);
  const [pais, setPais] = useState<string>("");
  const [sucursal, setSucursal] = useState<string>("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["usuarios", limit, offset, pais, sucursal],
    queryFn: () => ObtenerUsuarios(limit, offset, pais, sucursal),
    staleTime: 60 * 100 * 5,
    retry: 0,
  });

  const { data: paises } = useQuery({
    queryKey: ["paises"],
    queryFn: getPaises,
    staleTime: 100 * 60 * 60,
    retry: 0,
  });

  const { data: sucursales } = useQuery({
    queryKey: ["sucursales"],
    queryFn: getSucursales,
    staleTime: 100 * 60 * 60,
    retry: 0,
  });

  useEffect(() => {
    setOffset(0);
  }, [pais, sucursal]);

  const total = data?.total || 0;

  const handleNext = () => {
    if (offset + limit < total) {
      setOffset((prev) => prev + limit);
    }
  };

  const handlePrev = () => {
    setOffset((prev) => Math.max(prev - limit, 0));
  };

  return (
    <RoleGuard requiredRole="Administrador">
      <div className="container p-4 md:p-6 lg:p-8">
        <div className="flex justify-center">
          <h1 className="text-lg md:text-xl font-bold">Usuarios Analiza</h1>
        </div>
        <div className="w-full block md:flex md:gap-3">
          <div>
            <Select onValueChange={(value) => setPais(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione un país" />
              </SelectTrigger>
              <SelectContent>
                {paises?.map((pais) => (
                  <SelectItem key={pais.id} value={pais.id}>
                    {pais.nombre_pais}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select onValueChange={(value) => setSucursal(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione una sucursal" />
              </SelectTrigger>
              <SelectContent>
                {sucursales?.map((sucursal) => (
                  <SelectItem key={sucursal.id} value={sucursal.id}>
                    {sucursal.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-center mt-4 md:mt-8">
          <TableUsers
            usuarios={data?.usuarios}
            isLoading={isLoading}
            isError={isError}
            user={user}
          />
        </div>
        <div className="flex justify-center mt-5">
          <div className="flex gap-4 items-center">
            <ArrowLeftToLine
              className={`cursor-pointer ${
                offset === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handlePrev}
            />
            <span className="text-sm text-gray-600">
              Página {Math.floor(offset / limit) + 1}
            </span>
            <ArrowRightToLine
              className={`cursor-pointer ${
                offset + limit >= total ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleNext}
            />
          </div>
        </div>
      </div>
    </RoleGuard>
  );
};

export default UsuariosPage;
