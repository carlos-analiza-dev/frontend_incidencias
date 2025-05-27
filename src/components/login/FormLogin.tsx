"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";
import { LoginUser } from "@/interfaces/users/login-user.interface";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth/auth-store";

const FormLogin = () => {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUser>();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginUser) => {
    try {
      await login(data);
      toast({
        title: "Éxito",
        description: "Inicio de sesión exitoso.",
      });

      reset();
    } catch (error) {
      if (isAxiosError(error)) {
        toast({
          title: "Error",
          description: error.response?.data
            ? error.response.data.message
            : "Error al procesar la petición de inicio de sesión",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Iniciar Sesión
      </h2>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Correo Electrónico
        </label>
        <Input
          type="email"
          placeholder="example@gmail.com"
          {...register("email", {
            required: "El correo electronico es requerido",
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: "Correo electrónico no válido",
            },
          })}
          className="w-full"
        />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Contraseña
        </label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="w-full"
            {...register("password", {
              required: "La contraseña es obligatoria",
            })}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute flex items-center inset-y-0 right-2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2"
        >
          {isLoading ? "Cargando..." : "Iniciar Sesión"}
        </Button>
      </div>
    </form>
  );
};

export default FormLogin;
