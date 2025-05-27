import { RoleGuard } from "@/components/protected/RoleGuard";

const DashboardPage = () => {
  return (
    <RoleGuard requiredRole="Administrador">
      <div className="mt-32">DashboardPageAdmin</div>;
    </RoleGuard>
  );
};

export default DashboardPage;
