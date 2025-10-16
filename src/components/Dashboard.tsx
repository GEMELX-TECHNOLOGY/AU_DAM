import { Outlet, useLocation } from "react-router";
import AUDAM from "../assets/logo_audam.avif";
import { NavItem } from "./NavItem";
import { IconLogout, IconMenu2, IconX, IconUser } from "@tabler/icons-react";
import { WarehouseManager } from "../routes/role.routes";
import { useState, useEffect } from "react";
import clsx from "clsx";

export const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const location = useLocation();
  const currentPath = location.pathname;
  const role = localStorage.getItem("role");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser({ name: "Usuario", role: role || "Invitado" });
      }
    }
  }, [role]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar */}
      <div
        className={clsx(
          "fixed lg:static top-0 left-0 h-full lg:h-dvh bg-white shadow-lg lg:shadow-none z-40 flex flex-col transition-transform duration-300 ease-in-out w-64 lg:w-[260px]",
          isMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Header logo */}
        <div className="flex items-center justify-between lg:justify-center p-4 ">
          <img
            src={AUDAM}
            alt="AUDAM"
            className="lg:w-28 lg:h-28 w-20 h-20 object-contain"
          />
          <button className="lg:hidden text-gray-600" onClick={toggleMenu}>
            <IconX size={24} />
          </button>
        </div>

        {/* Perfil del usuario */}
        <div className="flex lg:hidden items-center gap-3 p-4 border-b">
          <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center">
            <IconUser size={22} />
          </div>
          <div>
            <p className="font-semibold text-gray-800">
              {user?.name || "Usuario"}
            </p>
            <p className="text-sm text-gray-500 capitalize">
              {user?.role || role}
            </p>
          </div>
        </div>

        {/* Navegación */}
        <nav className="flex flex-col flex-1 overflow-y-auto p-3 gap-1">
          {role === "warehouse" &&
            WarehouseManager.map((item) => (
              <NavItem
                key={item.path}
                name={item.name}
                to={item.path}
                icon={item.icon}
                isActive={currentPath === item.path}
                onClick={() => {
                  toggleMenu();
                }}
              />
            ))}
        </nav>

        {/* Cerrar sesión */}
        <div className="border-t p-4">
          <NavItem
            name="Cerrar Sesión"
            to="/logout"
            icon={<IconLogout size={20} />}
            isActive={false}
          />
        </div>
      </div>

      {/* Botón para abrir menú (solo móvil) */}
      <div className="lg:hidden flex items-center justify-between bg-white shadow p-4 sticky top-0 z-30">
        <button onClick={toggleMenu}>
          <IconMenu2 size={28} />
        </button>
        <img src={AUDAM} alt="AUDAM" className="w-16 h-16 object-contain" />
      </div>

      {/* Fondo oscuro al abrir el menú en móvil */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
          onClick={toggleMenu}
        />
      )}

      {/* Contenido principal */}
      <main className="flex-1 bg-[#F8F9FD] min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};
