import { CrearAccionIncidente } from "@/api/acciones/crear-accion-incidencia";
import { SearchUsuarios } from "@/api/users/get-users";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { User } from "@/interfaces/users/user.interface";
import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { Search, X } from "lucide-react";
import React, { useState, useEffect } from "react";

interface Props {
  user: User;
  incindencia_id: string;
}

const FormAcciones = ({ user, incindencia_id }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    acciones_tomadas: "",
    fecha_limite_implementacion: "",
    responsable_aplicar_correcciones_id: "",
  });

  const {
    data: users,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["search-users", searchTerm],
    queryFn: () => SearchUsuarios(searchTerm),
    retry: 0,
    enabled: false,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim() !== "") {
        refetch();
      } else {
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, refetch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowResults(true);
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setFormData((prev) => ({
      ...prev,
      responsable_aplicar_correcciones_id: user.id,
    }));
    setSearchTerm(user.name);
    setShowResults(false);
  };

  const clearSelection = () => {
    setSelectedUser(null);
    setSearchTerm("");
    setFormData((prev) => ({
      ...prev,
      responsable_aplicar_correcciones_id: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.responsable_aplicar_correcciones_id) {
      toast({
        title: "Error",
        description: "Por favor selecciona un responsable",
        variant: "destructive",
      });
      return;
    }
    if (!user.id) {
      toast({
        title: "Error",
        description: "No se encontro el usuario creador para esta accion",
        variant: "destructive",
      });
      return;
    }
    if (!incindencia_id) {
      toast({
        title: "Error",
        description: "No se encontro la incidencia para esta accion",
        variant: "destructive",
      });
      return;
    }

    try {
      const data = {
        acciones_tomadas: formData.acciones_tomadas,
        responsable_aplicar_correcciones_id:
          formData.responsable_aplicar_correcciones_id,
        fecha_limite_implementacion: formData.fecha_limite_implementacion,
        incidente_accion_id: incindencia_id,
        usuario_accion_id: user.id,
      };

      const response = await CrearAccionIncidente(data);

      toast({ title: "Exito", description: "Accion creada exitosamente." });
      setFormData({
        acciones_tomadas: "",
        fecha_limite_implementacion: "",
        responsable_aplicar_correcciones_id: "",
      });
      clearSelection();
    } catch (error) {
      if (isAxiosError(error)) {
        toast({
          title: "Error",
          description: error.response?.data
            ? error.response.data.message
            : "Ocurrio un error al momento de crear la accion",
        });
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 rounded-sm shadow p-4">
      <div className="space-y-2">
        <label className="font-semibold">Acción a tomar</label>
        <Textarea
          name="acciones_tomadas"
          placeholder="Escribe la acción a tomar..."
          value={formData.acciones_tomadas}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="space-y-2 mt-4">
        <label className="font-semibold">Fecha límite de implementación</label>
        <Input
          type="date"
          name="fecha_limite_implementacion"
          value={formData.fecha_limite_implementacion}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="space-y-2 mt-4">
        <label className="font-semibold">Responsable</label>
        <div className="relative">
          <div className="flex items-center relative">
            <Input
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => setShowResults(true)}
              required={!selectedUser}
            />
            {selectedUser ? (
              <X
                size={20}
                className="absolute right-10 text-gray-400 cursor-pointer hover:text-gray-600"
                onClick={clearSelection}
              />
            ) : (
              <Search size={20} className="absolute right-2 text-gray-400" />
            )}
          </div>

          {showResults && searchTerm && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
              {isLoading ? (
                <div className="p-2 text-center text-gray-500">Buscando...</div>
              ) : isError ? (
                <div className="p-2 text-center text-red-500">
                  Error al buscar usuarios
                </div>
              ) : users && users?.length > 0 ? (
                users.map((user) => (
                  <div
                    key={user.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleUserSelect(user)}
                  >
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                    <div className="text-xs text-gray-400">
                      {user.sucursal?.nombre}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-2 text-center text-gray-500">
                  No se encontraron resultados
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="mt-4">
        <Button type="submit" className="w-full">
          Agregar Acción
        </Button>
      </div>
    </form>
  );
};

export default FormAcciones;
