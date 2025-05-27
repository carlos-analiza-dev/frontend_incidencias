import FormLogin from "@/components/login/FormLogin";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-7xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="bg-blue-50 flex items-center justify-center p-8">
            <div className="max-w-md w-full">
              <Image
                src="/images/logo-analiza.png"
                width={500}
                height={500}
                alt="logo-analiza"
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="flex items-center justify-center p-8 md:p-12">
            <div className="w-full max-w-xl">
              <FormLogin />
              <div className="block md:flex justify-between gap-2">
                <div className="mt-4 flex gap-2 text-sm">
                  <p>¿No tienes una cuenta?</p>
                  {""}{" "}
                  <Link
                    className="text-blue-600 hover:underline"
                    href="/register"
                  >
                    registrate
                  </Link>
                </div>
                <div className="mt-4 flex gap-2 text-sm">
                  <p>¿Olvidaste tu contraseña?</p>
                  {""}{" "}
                  <Link
                    className="text-blue-600 hover:underline"
                    href="/change-password"
                  >
                    cambiar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
