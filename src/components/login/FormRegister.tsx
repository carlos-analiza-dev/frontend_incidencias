"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getSucursales } from "@/api/sucursales/getSucursales";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getPaises } from "@/api/paises/get-paises";
import { useForm } from "react-hook-form";
import { CreateUser } from "@/interfaces/users/register-user.interface";
import { RegistrarUsuario } from "@/api/users/create-user";
import { toast } from "@/hooks/use-toast";
import useUserCountry from "@/helpers/localization";
import { GetAreas, ObtenerAreas } from "@/api/areas/get-areas";
import { isAxiosError } from "axios";

const FormRegister = () => {
  const country = useUserCountry();
  const {
    register,
    reset,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateUser>();
  const password = watch("password");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const { data: sucursales } = useQuery({
    queryKey: ["sucursales"],
    queryFn: getSucursales,
    staleTime: 100 * 60 * 60,
    retry: 0,
  });

  const { data: paises } = useQuery({
    queryKey: ["paises"],
    queryFn: getPaises,
    staleTime: 100 * 60 * 60,
    retry: 0,
  });

  const { data: areas } = useQuery({
    queryKey: ["areas"],
    queryFn: () => GetAreas(),
    staleTime: 100 * 60 * 60,
    retry: 0,
  });

  const mutation = useMutation({
    mutationKey: ["crear-usuario"],
    mutationFn: RegistrarUsuario,
  });

  const onSubmit = async (data: CreateUser) => {
    const { confirmPassword, ...userData } = data;

    mutation.mutate(userData, {
      onSuccess: () => {
        toast({
          title: "Exito",
          description: "Usuario registrado exitosamente.",
        });
        reset();
      },
      onError: (error: any) => {
        if (isAxiosError(error)) {
          toast({
            title: "Error",
            description: error.response?.data
              ? error.response.data.message
              : "Ocurrio un error al momento de registrar el usuario",
            variant: "destructive",
          });
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Regístrate
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Correo Electrónico
          </label>
          <Input
            {...register("email", {
              required: "El correo electronico es requerido",
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: "Correo electrónico no válido",
              },
            })}
            type="email"
            placeholder="example@gmail.com"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Nombre Completo
          </label>
          <Input
            {...register("name", { required: "El nombre es requerido." })}
            type="text"
            placeholder="Escribe tu nombre"
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2 relative">
          <label className="block text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            {...register("password", {
              required: "La contraseña es obligatoria",
            })}
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-7 right-2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="space-y-2 relative">
          <label className="block text-sm font-medium text-gray-700">
            Confirmar Contraseña
          </label>
          <Input
            type={showPasswordConfirm ? "text" : "password"}
            placeholder="••••••••"
            {...register("confirmPassword", {
              required: "Confirma tu contraseña",
              validate: (value) =>
                value === password || "Las contraseñas no coinciden",
            })}
          />
          <button
            type="button"
            onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
            className="absolute inset-y-7 right-2 text-gray-500 hover:text-gray-700"
          >
            {showPasswordConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          {errors.confirmPassword && (
            <p className="text-red-600 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Sucursal
          </label>
          <Select
            required
            onValueChange={(value) => setValue("sucursal", value)}
          >
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

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Area
          </label>
          <Select required onValueChange={(value) => setValue("area", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccione una area" />
            </SelectTrigger>
            <SelectContent>
              {areas?.area.map((area) => (
                <SelectItem key={area.id} value={area.id}>
                  {area.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            País
          </label>
          <Select required onValueChange={(value) => setValue("pais", value)}>
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

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Teléfono
          </label>
          <Input
            {...register("telefono", {
              required: "El telefono es obligatorio",
            })}
            type="text"
            placeholder="99999999"
          />
          {errors.telefono && (
            <p className="text-red-600 text-sm mt-1">
              {errors.telefono.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Identificacion DNI
          </label>
          <Input
            {...register("identificacion", {
              required: "La identificacion es obligatorio",
              pattern: {
                value:
                  country === "Honduras"
                    ? /^\d{4}-\d{4}-\d{5}$/
                    : /^\d{8}-\d{1}$/,
                message: `Formato inválido (ej: ${
                  country === "Honduras" ? "1201-1990-00990" : "12312314-0"
                })`,
              },
            })}
            type="text"
            placeholder={`${
              country === "Honduras" ? "xxxx-xxxx-xxxxx" : "xxxxxxxx-x"
            }`}
          />
          {errors.identificacion && (
            <p className="text-red-600 text-sm mt-1">
              {errors.identificacion.message}
            </p>
          )}
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Dirección
          </label>
          <Textarea
            {...register("direccion", {
              required: "La direccion es obligatoria",
            })}
            placeholder="Escribe tu dirección"
          />
          {errors.direccion && (
            <p className="text-red-600 text-sm mt-1">
              {errors.direccion.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2"
        >
          Registrarme
        </Button>
      </div>
    </form>
  );
};

export default FormRegister;
