"use client";
import React, { useState } from "react";
import TableAreas from "./components/TableAreas";
import { ArrowLeftToLine, ArrowRightToLine } from "lucide-react";
import { useAuthStore } from "@/stores/auth/auth-store";
import { useQuery } from "@tanstack/react-query";
import { ObtenerAreas } from "@/api/areas/get-areas";
import { RoleGuard } from "@/components/protected/RoleGuard";

const AdminAreasPage = () => {
  const { user } = useAuthStore();
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["areas", limit, offset],
    queryFn: () => ObtenerAreas(limit, offset),
    staleTime: 60 * 100 * 5,
    retry: 0,
  });

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
          <h1 className="text-lg md:text-xl font-bold">Areas Analiza</h1>
        </div>
        <div className="flex justify-center mt-4 md:mt-8">
          <TableAreas
            areas={data?.area}
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

export default AdminAreasPage;
