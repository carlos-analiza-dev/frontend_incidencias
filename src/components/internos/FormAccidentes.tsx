"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getSucursales } from "@/api/sucursales/getSucursales";
import { toast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { CreateAccidente } from "@/interfaces/accidentes/accidente-create.interface";
import { CrearAccidentes } from "@/api/accidentes/create-accidentes";
import useUserCountry from "@/helpers/localization";

const FormAccidentes = () => {
  const country = useUserCountry();

  const [showMedicalDetails, setShowMedicalDetails] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateAccidente>();

  const { data } = useQuery({
    queryKey: ["sucursales"],
    queryFn: () => getSucursales(),
    staleTime: 100 * 60 * 60,
    retry: 0,
  });

  const mutation = useMutation({
    mutationKey: ["crear-accidente"],
    mutationFn: CrearAccidentes,
  });

  const onSubmit = (formData: CreateAccidente) => {
    mutation.mutate(formData, {
      onSuccess: () => {
        toast({
          title: "Accidente enviado",
          description: "Gracias por reportar el accidente.",
        });
        reset();
        setShowMedicalDetails(false);
      },
      onError: () => {
        toast({
          title: "Error al enviar el accidente",
          description: "Ocurrió un error inesperado.",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 bg-white rounded-2xl shadow-md w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 sticky top-0 bg-white py-2 z-10">
          Reporte de Accidente
        </h2>

        <div className="max-h-[calc(100vh-200px)] overflow-y-auto px-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Área o lugar del accidente *
                </label>
                <Input
                  {...register("area", {
                    required: "Este campo es obligatorio",
                  })}
                  type="text"
                  placeholder="Ej. Oficina, Pasillo A3"
                />
                {errors.area && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.area.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sucursal *
                </label>
                <Select
                  onValueChange={(value) => setValue("sucursalId", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione una sucursal" />
                  </SelectTrigger>
                  <SelectContent>
                    {data?.map((sucursal) => (
                      <SelectItem key={sucursal.id} value={sucursal.id}>
                        {sucursal.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.sucursalId && (
                  <p className="text-red-600 text-sm mt-1">
                    Seleccione una sucursal
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del notificante *
                </label>
                <Input
                  {...register("nombreNotificante", {
                    required: "Este campo es obligatorio",
                  })}
                  type="text"
                  placeholder="Nombre completo"
                />
                {errors.nombreNotificante && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.nombreNotificante.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cargo del notificante *
                </label>
                <Input
                  {...register("cargoNotificante", {
                    required: "Este campo es obligatorio",
                  })}
                  type="text"
                  placeholder="Cargo o posición"
                />
                {errors.cargoNotificante && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.cargoNotificante.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del afectado *
                </label>
                <Input
                  {...register("nombreAfectado", {
                    required: "Este campo es obligatorio",
                  })}
                  type="text"
                  placeholder="Nombre completo"
                />
                {errors.nombreAfectado && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.nombreAfectado.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  DNI del afectado *
                </label>
                <Input
                  {...register("dniAfectado", {
                    required: "Este campo es obligatorio",
                    pattern: {
                      value:
                        country === "Honduras"
                          ? /^\d{4}-\d{4}-\d{5}$/
                          : /^\d{8}-\d{1}$/,
                      message: `Formato inválido (ej: ${
                        country === "Honduras"
                          ? "1201-1990-00990"
                          : "12312314-0"
                      })`,
                    },
                  })}
                  type="text"
                  placeholder={`${
                    country === "Honduras" ? "xxxx-xxxx-xxxxx" : "xxxxxxxx-x"
                  }`}
                />
                {errors.dniAfectado && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.dniAfectado.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha del accidente *
                </label>
                <Input
                  {...register("fechaIncidente", {
                    required: "Este campo es obligatorio",
                  })}
                  type="date"
                />
                {errors.fechaIncidente && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.fechaIncidente.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hora del incidente *
                </label>
                <Input
                  {...register("hora", {
                    required: "Este campo es obligatorio",
                  })}
                  type="time"
                />
                {errors.hora && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.hora.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción del incidente *
              </label>
              <Textarea
                placeholder="Describe brevemente lo ocurrido..."
                className="w-full min-h-[120px]"
                {...register("descripcion", {
                  required: "Este campo es obligatorio",
                })}
              />
              {errors.descripcion && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.descripcion.message}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3 py-4 border-t border-b border-gray-200">
              <Checkbox
                id="medicalDetails"
                onCheckedChange={(checked) =>
                  setShowMedicalDetails(Boolean(checked))
                }
              />
              <label
                htmlFor="medicalDetails"
                className="font-medium text-gray-700"
              >
                ¿Fue atendido por un médico?
              </label>
            </div>

            {showMedicalDetails && (
              <div className="space-y-6 bg-gray-50 p-4 rounded-lg">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ¿Estaba en su puesto de trabajo?
                      </label>
                      <RadioGroup
                        onValueChange={(value) =>
                          setValue("enPuesto", Number(value))
                        }
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="1" id="enPuesto-si" />
                          <label htmlFor="enPuesto-si">Sí</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="0" id="enPuesto-no" />
                          <label htmlFor="enPuesto-no">No</label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ¿Hacía labores habituales?
                      </label>
                      <RadioGroup
                        onValueChange={(value) =>
                          setValue("laboresHabituales", Number(value))
                        }
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="1" id="labores-si" />
                          <label htmlFor="labores-si">Sí</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="0" id="labores-no" />
                          <label htmlFor="labores-no">No</label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ¿Detalla parte del cuerpo afectada?
                      </label>
                      <RadioGroup
                        onValueChange={(value) =>
                          setValue("detallaParteCuerpo", Number(value))
                        }
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="1" id="parteCuerpo-si" />
                          <label htmlFor="parteCuerpo-si">Sí</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="0" id="parteCuerpo-no" />
                          <label htmlFor="parteCuerpo-no">No</label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ¿Utilizaba EPP completo?
                      </label>
                      <RadioGroup
                        onValueChange={(value) =>
                          setValue("usoEPPCompleto", Number(value))
                        }
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="1" id="epp-si" />
                          <label htmlFor="epp-si">Sí</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="0" id="epp-no" />
                          <label htmlFor="epp-no">No</label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Describa el EPP que utilizaba
                  </label>
                  <Textarea
                    placeholder="Equipo de protección personal utilizado..."
                    className="w-full"
                    {...register("descripcionEPP")}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ¿Exige atención del Jefe de Laboratorio?
                  </label>
                  <RadioGroup
                    onValueChange={(value) =>
                      setValue("exigeAtencionJefeLab", Number(value))
                    }
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id="jefeLab-si" />
                      <label htmlFor="jefeLab-si">Sí</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="0" id="jefeLab-no" />
                      <label htmlFor="jefeLab-no">No</label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Acción tomada
                  </label>
                  <Textarea
                    placeholder="Describa las acciones realizadas..."
                    className="w-full"
                    {...register("accionTomada")}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Observaciones adicionales
                  </label>
                  <Textarea
                    placeholder="Escriba cualquier observación relevante..."
                    className="w-full"
                    {...register("observaciones")}
                  />
                </div>
              </div>
            )}

            <div className="sticky bottom-0 bg-white pt-4 pb-2">
              <Button
                disabled={mutation.isPending}
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2"
              >
                {mutation.isPending ? "Enviando..." : "Reportar Accidente"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormAccidentes;
