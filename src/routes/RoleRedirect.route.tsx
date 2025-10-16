import { Navigate } from "react-router";

export function RoleRedirect() {
  const user = localStorage.getItem("role");

  if (!user) {
    return <Navigate to="/iniciar-sesion" replace />;
  }

  switch (user) {
    case "warehouse":
      return <Navigate to="/almacen" replace />;
    case "authorizer":
      return <Navigate to="/autorizadores" replace />;
    default:
      return <Navigate to="/acceso-denegado" replace />;
  }
}
