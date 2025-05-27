"use client";

import { useAuthStore } from "@/stores/auth/auth-store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import Spinner from "@/components/loader/Spinner";
import { Separator } from "@/components/ui/separator";
import SideBar from "@/components/SideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { isAuthenticated, isLoading, user } = useAuthStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated || isLoading) return;

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (user?.rol) {
      switch (user.rol) {
        case "Administrador":
          router.push("/dashboard");
          break;
        case "Gerente_Sucursal":
          router.push("/accidentes-sucursal");
          break;
        case "Gerente_Area":
          router.push("/accidentes_area");
          break;
        case "Gerente_Operaciones":
          router.push("/accidentes_operaciones");
          break;
        case "Regente":
          router.push("/accidentes-regente");
          break;
        case "User":
          router.push("/usuarios-user");
          break;
        default:
          router.push("/not-found");
      }
    }
  }, [isAuthenticated, isLoading, user, router, isHydrated]);

  if (!isHydrated || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <main className="h-full flex flex-col md:flex-row mt-20">
      {isAuthenticated && (
        <>
          <div className="hidden lg:block md:w-2/12">
            <SideBar />
          </div>
          <Separator orientation="vertical" />
        </>
      )}

      <div
        className={`w-full ${
          isAuthenticated && user?.rol === "Administrador"
            ? "lg:w-10/12"
            : "lg:w-full"
        } flex flex-col`}
      >
        <main className="flex-1 overflow-auto p-3">
          {!isLoading && <NavBar />}
          {children}
        </main>
      </div>
    </main>
  );
}
