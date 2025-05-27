"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getSucursales } from "@/api/sucursales/getSucursales";
import { useForm } from "react-hook-form";
import { CreateIncidencia } from "@/interfaces/incidencias/create-incidencia.interface";
import { toast } from "@/hooks/use-toast";
import { CrearIncidencia } from "@/api/incidencias/create-incidencia";

const FormIncidencia = () => {
  const [showEmail, setShowEmail] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateIncidencia>();

  const { data } = useQuery({
    queryKey: ["sucursales"],
    queryFn: () => getSucursales(),
    staleTime: 100 * 60 * 60,
    retry: 0,
  });

  const mutation = useMutation({
    mutationKey: ["crear-incidencia"],
    mutationFn: CrearIncidencia,
  });

  const onSubmit = (formData: CreateIncidencia) => {
    mutation.mutate(formData, {
      onSuccess: () => {
        toast({
          title: "Incidencia enviada",
          description: "Gracias por reportar la incidencia.",
        });
        reset();
        setShowEmail(false);
      },

      onError: () => {
        toast({
          title: "Error al enviar la incidencia",
          description: "Ocurrió un error inesperado.",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 bg-white rounded-2xl shadow-md space-y-5 max-w-xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Reporte de Incidencia
      </h2>

      <div>
        <label htmlFor="area" className="block text-base font-semibold mb-1">
          Área o lugar del incidente
        </label>
        <Input
          id="area"
          {...register("area", { required: "El area es obligatoria" })}
          type="text"
          placeholder="Ej. Oficina, Pasillo A3"
          className="w-full"
          required
        />
        {errors.area && (
          <p className="text-red-600 font-bold mt-1">{errors.area.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="area" className="block text-base font-semibold mb-1">
          Sucursal
        </label>
        <Select
          name="sucursal"
          required
          onValueChange={(value) => setValue("sucursalId", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="--Sucursal--" />
          </SelectTrigger>
          <SelectContent>
            {data && data.length > 0 ? (
              data.map((sucursal) => (
                <SelectItem key={sucursal.id} value={sucursal.id}>
                  {sucursal.nombre}
                </SelectItem>
              ))
            ) : (
              <div>No se encontraron sucursales</div>
            )}
          </SelectContent>
        </Select>
        {errors.sucursalId && (
          <p className="text-red-600 font-bold mt-1">
            {errors.sucursalId.message}
          </p>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="fecha" className="block text-base font-semibold mb-1">
            Fecha del incidente
          </label>
          <Input
            {...register("fecha_incidente", {
              required: "La fecha del incidente es obligaroria",
            })}
            type="date"
          />
          {errors.fecha_incidente && (
            <p className="text-red-600 font-bold mt-1">
              {errors.fecha_incidente.message}
            </p>
          )}
        </div>

        <div className="flex-1">
          <label htmlFor="hora" className="block text-base font-semibold mb-1">
            Hora del incidente
          </label>
          <Input
            {...register("hora", {
              required: "La hora del incidente es obligatoria.",
            })}
            id="hora"
            name="hora"
            type="time"
            required
          />
          {errors.hora && (
            <p className="text-red-600 font-bold mt-1">{errors.hora.message}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="descripcion"
          className="block text-base font-semibold mb-1"
        >
          Descripción del incidente
        </label>
        <Textarea
          id="descripcion"
          placeholder="Describe brevemente lo ocurrido..."
          className="w-full"
          required
          {...register("descripcion", {
            required: "La descripcion del incidente es obligaria.",
          })}
        />
        {errors.descripcion && (
          <p className="text-red-600 font-bold mt-1">
            {errors.descripcion.message}
          </p>
        )}
      </div>

      <div className="flex items-start gap-3">
        <Checkbox
          id="addEmail"
          onCheckedChange={(checked) => setShowEmail(Boolean(checked))}
        />
        <label htmlFor="addEmail" className="text-sm font-medium">
          ¿Deseas agregar tu correo para recibir seguimiento?
        </label>
      </div>

      {showEmail && (
        <div>
          <label
            htmlFor="correo"
            className="block text-base font-semibold mb-1"
          >
            Correo electrónico
          </label>
          <Input
            id="correo"
            {...(showEmail
              ? register("correo", {
                  required: "El correo es obligatorio si deseas seguimiento.",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "El correo no es válido.",
                  },
                })
              : register("correo"))}
            type="email"
            placeholder="example@gmail.com"
            className="w-full"
            required
          />
        </div>
      )}

      <div className="pt-4">
        <Button
          disabled={mutation.isPending}
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          Enviar información
        </Button>
      </div>
    </form>
  );
};

export default FormIncidencia;
