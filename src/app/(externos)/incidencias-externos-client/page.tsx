import FormIncidencia from "@/components/externos/FormIncidencia";
import Image from "next/image";
import React from "react";

const IncidenciasExternasPage = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
            Reporta cualquier incidencia o molestia ocurrida en{" "}
            <span className="text-blue-600 whitespace-nowrap">
              Laboratorios Centroamericanos
            </span>
          </h1>

          <div className="mt-4 md:mt-6 p-3 bg-red-50 border-l-4 border-red-500 inline-block">
            <p className="text-red-700 font-medium">
              <span aria-hidden="true" className="mr-2">
                ⚠️
              </span>
              Recuerda que esta información se brinda de forma anónima
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <div className="hidden md:block relative h-full min-h-[400px] lg:min-h-[auto]">
            <Image
              src="/images/logo-analiza.png"
              alt="Logo de Laboratorios Centroamericanos"
              fill
              className="object-contain object-center"
              priority
            />
          </div>

          <div className="bg-white rounded-xl shadow-md p-2 md:p-4 h-full">
            <h2 className="text-lg md:text-2xl font-semibold text-gray-800 mb-6">
              Formulario de Reporte
            </h2>
            <FormIncidencia />
          </div>
        </div>

        <div className="mt-12 text-center text-gray-600 text-sm md:text-base">
          <p>
            Tu reporte nos ayuda a mejorar nuestros servicios. Todos los datos
            son tratados con confidencialidad.
          </p>
        </div>
      </div>
    </main>
  );
};

export default IncidenciasExternasPage;
