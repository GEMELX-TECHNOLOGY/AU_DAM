import { IconBook, IconBox, IconCar, IconHome } from "@tabler/icons-react";

export const WarehouseManager = [
  {
    name: "Home",
    path: "/almacen",
    icon: <IconHome />,
  },
  {
    name: "Inventario de Almacen",
    path: "/almacen/inventario-almacen",
    icon: <IconBox />,
  },

  {
    name: "Inventario de Activos",
    path: "/almacen/inventario-activos",
    icon: <IconCar />,
  },
  {
    name: "Requisiciones",
    path: "/almacen/requisiciones",
    icon: <IconBook />,
  },
];
