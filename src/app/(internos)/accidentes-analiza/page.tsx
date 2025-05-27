import FormAccidentes from "@/components/internos/FormAccidentes";

import Image from "next/image";
import React from "react";

const AccidentesPage = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
            Reporta cualquier accidente ocurrida en{" "}
            <span className="text-blue-600 whitespace-nowrap">
              Laboratorios Centroamericanos
            </span>
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          <div className="hidden md:block relative h-full min-h-[400px] lg:min-h-[auto]">
            <Image
              src="/images/logo-analiza.png"
              alt="Logo de Laboratorios Centroamericanos"
              fill
              className="object-contain object-center"
              priority
            />
          </div>

          <div className="bg-white lg:col-span-2 rounded-xl shadow-md p-2 md:p-4 h-full">
            <h2 className="text-lg md:text-2xl font-semibold text-gray-800 mb-6">
              Formulario de Reporte
            </h2>
            <FormAccidentes />
          </div>
        </div>

        <div className="mt-12 text-center text-gray-600 text-sm md:text-base">
          <p>Tu reporte nos ayuda a mejorar nuestros servicios.</p>
        </div>
      </div>
    </main>
  );
};

export default AccidentesPage;
