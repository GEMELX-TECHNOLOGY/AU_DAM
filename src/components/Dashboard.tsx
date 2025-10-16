import { Outlet, useLocation } from "react-router";
import AUDAM from "../assets/logo_audam.avif";
import { NavItem } from "./NavItem";
import { IconLogout } from "@tabler/icons-react";
import { WarehouseManager } from "../routes/role.routes";

export const Dashboard = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const role = localStorage.getItem("role");

  return (
    <div className="flex flex-row">
      <div className="flex flex-col h-dvh w-[260px] pt-10">
        <div className="w-full flex justify-center mb-10">
          <img src={AUDAM} alt="AUDAM's" className="w-30 h-30" />
        </div>

        <div className="flex flex-col gap-2.5 flex-grow">
          {role === "warehouse" &&
            WarehouseManager.map((item) => (
              <NavItem
                key={item.path}
                name={item.name}
                to={item.path}
                icon={item.icon}
                isActive={
                  currentPath === item.path ||
                  (item.path === "/" && currentPath === "")
                }
              />
            ))}
        </div>

        <div className="border-t border-green-200 py-2">
          <NavItem
            name="Cerrar Sesión"
            to="/logout"
            icon={<IconLogout size={20} />}
            isActive={false}
          />
        </div>
      </div>
      <main className="flex-1 bg-[#F8F9FD]">
        <Outlet />
      </main>
    </div>
  );
};
