import { sidebarAdmin, sidebarSucursal } from "@/data/SideBarData";
import { useAuthStore } from "@/stores/auth/auth-store";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuByRole: Record<string, typeof sidebarAdmin> = {
  Administrador: sidebarAdmin,
  Gerente_Sucursal: sidebarSucursal,
};

const SideBar = () => {
  const { user } = useAuthStore();
  const path = usePathname();

  const sidebarItems = user?.rol ? menuByRole[user.rol] || [] : [];

  return (
    <aside className="fixed h-full  md:block md:w-2/12 bg-white shadow-lg flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-sky-900 flex justify-center">
          Menú
        </h2>
      </div>
      <nav className="flex-1 h-full  p-2">
        {sidebarItems.map((item) => {
          const isActive = path.startsWith(item.url);
          return (
            <Link
              key={item.id}
              href={item.url}
              className={`flex items-center p-3 my-1 rounded-lg transition-colors duration-200 ${
                isActive
                  ? "bg-sky-600 text-white shadow-md"
                  : "text-sky-900 hover:bg-sky-100"
              }`}
            >
              <item.icon className="mr-3" size="20" />
              <span className="flex-1">{item.name}</span>
              {isActive && (
                <span className="w-2 h-2 bg-white rounded-full"></span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default SideBar;
