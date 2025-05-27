import { RoleGuard } from "@/components/protected/RoleGuard";
import React from "react";

const UsuariosPage = () => {
  return (
    <RoleGuard requiredRole="User">
      <div>UsuariosPage</div>
    </RoleGuard>
  );
};

export default UsuariosPage;
