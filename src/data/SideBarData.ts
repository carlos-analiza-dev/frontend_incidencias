import {
  LayoutDashboard,
  Locate,
  TrafficCone,
  TriangleAlert,
  Users,
} from "lucide-react";

export const sidebarAdmin = [
  {
    id: 1,
    url: "/dashboard",
    name: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    id: 2,
    url: "/admin-accidentes",
    name: "Accidentes",
    icon: TrafficCone,
  },
  {
    id: 3,
    url: "/admin-incidentes",
    name: "Incidentes",
    icon: TriangleAlert,
  },
  {
    id: 4,
    url: "/usuarios",
    name: "Usuarios",
    icon: Users,
  },
  {
    id: 5,
    url: "/admin-area",
    name: "Areas",
    icon: Locate,
  },
];

export const sidebarSucursal = [
  {
    id: 1,
    url: "/accidentes-sucursal",
    name: "Accidentes",
    icon: TrafficCone,
  },
  {
    id: 2,
    url: "/incidencias_sucursal",
    name: "Incidentes",
    icon: TriangleAlert,
  },
];
