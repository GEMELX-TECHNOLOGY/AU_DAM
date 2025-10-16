import { Navigate, Route, Routes } from "react-router";
import Login from "../pages/authentication/Login";
import WarehouseHome from "../pages/warehouse/WarehouseHome";
import { Dashboard } from "../components/Dashboard";
import { RequireRole } from "./RequireRole.route";
import { ROLES } from "../data/ROLES";
import { RoleRedirect } from "./RoleRedirect.route";
import UnAuthorized from "../pages/UnAuthorized";

export function AppRoutes() {
  return (
    <Routes>
      {/* ===================== */}
      {/* ==== RUTAS BASE ===== */}
      {/* ===================== */}
      <Route path="/iniciar-sesion" element={<Login />} />
      <Route path="/acceso-denegado" element={<UnAuthorized />} />
      <Route path="/redireccionar-por-rol" element={<RoleRedirect />} />
      <Route path="*" element={<div>404 NO ENCONTRADO</div>} />

      {/* ===================== */}
      {/* ==== RUTAS BASE ===== */}
      {/* ===================== */}
      <Route
        element={
          <RequireRole allowedRoles={[ROLES.WAREHOUSE, ROLES.AUTHORIZER]} />
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route
          index
          element={<Navigate to="/redireccionar-por-rol" replace />}
        />
      </Route>

      {/* ===================== */}
      {/* ==== RUTAS WAREHOUSE ===== */}
      {/* ===================== */}
      <Route
        path="/"
        element={<RequireRole allowedRoles={[ROLES.WAREHOUSE]} />}
      >
        <Route path="/almacen" element={<Dashboard />}>
          <Route index element={<WarehouseHome />} />
        </Route>
      </Route>

      {/* ===================== */}
      {/* ==== RUTAS AUTHORIZER ===== */}
      {/* ===================== */}
      {/* <Route
        path="/"
        element={<RequireRole allowedRoles={[ROLES.AUTHORIZER]} />}
      >
        <Route path="/autorizadores" element={<Dashboard />}>
          <Route index element={<AuthorizerHome />} />
        </Route>
      </Route> */}
    </Routes>
  );
}
