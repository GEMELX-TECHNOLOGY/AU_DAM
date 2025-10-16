import { Navigate, Outlet } from "react-router";

interface AllowedRoles {
  allowedRoles: string[];
}

export function RequireRole({ allowedRoles }: AllowedRoles) {
  const user = localStorage.getItem("role");

  if (!user) {
    return <Navigate to="/iniciar-sesion" replace />;
  }

  const userRole = user;
  const isAuthorized = allowedRoles.includes(userRole);

  if (isAuthorized) {
    return <Outlet />;
  } else {
    return <Navigate to="/acceso-denegado" replace />;
  }
}
