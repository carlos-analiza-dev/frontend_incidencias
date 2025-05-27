"use client";

import { useAuthStore } from "@/stores/auth/auth-store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "../loader/Spinner";

interface RoleGuardProps {
  children: React.ReactNode;
  requiredRole:
    | "Administrador"
    | "Gerente_Sucursal"
    | "Gerente_Area"
    | "Gerente_Operaciones"
    | "User";
  redirectTo?: string;
}

export const RoleGuard = ({
  children,
  requiredRole,
  redirectTo = "/unauthorized",
}: RoleGuardProps) => {
  const router = useRouter();
  const { isAuthenticated, isLoading, user, hasRole } = useAuthStore();
  const [accessGranted, setAccessGranted] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/login");
        return;
      }

      const roleCheck = hasRole(requiredRole);

      if (!roleCheck) {
        router.push(redirectTo);
        return;
      }

      setAccessGranted(true);
    }
  }, [
    isAuthenticated,
    isLoading,
    requiredRole,
    redirectTo,
    router,
    hasRole,
    user,
  ]);

  if (isLoading || !accessGranted) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return <>{children}</>;
};
