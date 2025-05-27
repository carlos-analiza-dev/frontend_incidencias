"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { ChangePassword } from "@/interfaces/users/change-password.interface";
import { useMutation } from "@tanstack/react-query";
import { CambiarContraseña } from "@/api/users/change-password";
import { toast } from "@/hooks/use-toast";
import { isAxiosError } from "axios";

const FormChangePassword = () => {
  const {
    register,
    reset,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChangePassword>();
  const password = watch("nuevaContrasena");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const mutation = useMutation({
    mutationKey: ["change-password"],
    mutationFn: CambiarContraseña,
  });

  const onSubmit = async (data: ChangePassword) => {
    const { confirmPassword, ...rest } = data;
    mutation.mutate(rest, {
      onSuccess: () => {
        toast({
          title: "Exito",
          description:
            "Contraseña actualizada con exito, revisa tu correo electronico",
        });
        reset();
      },
      onError: (error) => {
        if (isAxiosError(error)) {
          toast({
            title: "Ocurrio un error",
            description: error.response?.data
              ? error.response.data.message
              : "Ocurrio un error al momento de cambiar la contraseña",
          });
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Restablecer Contraseña
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
          Contraseña nueva
        </label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="w-full"
            {...register("nuevaContrasena", {
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
          {errors.nuevaContrasena && (
            <p className="text-red-600 text-sm mt-1">
              {errors.nuevaContrasena.message}
            </p>
          )}
        </div>
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

      <div className="pt-2">
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2"
        >
          Cambiar Contraseña
        </Button>
      </div>
    </form>
  );
};

export default FormChangePassword;
