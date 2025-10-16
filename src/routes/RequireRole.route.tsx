import { Navigate, Outlet } from "react-router";

export function RequireRole({ allowedRoles }) {
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
