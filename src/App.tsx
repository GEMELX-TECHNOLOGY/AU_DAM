import { useEffect } from "react";
import { BrowserRouter } from "react-router";
import { AppRoutes } from "./routes/App.routes";

function App() {
  // Guardar item en localStorage y log para verificar
  localStorage.setItem("nombre", "AUDAM");
  console.log("localStorage actualizado con clave: 'nombre'");

  useEffect(() => {
    // Comprobar si el navegador soporta Service Workers
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration: ServiceWorkerRegistration) => {
          console.log("Service Worker registrado con éxito:", registration);
        })
        .catch((error: unknown) => {
          console.error("Error al registrar el Service Worker:", error);
        });

      // Comprobar si el controlador está activo
      if (navigator.serviceWorker.controller) {
        console.log("El Service Worker está activo y controlando la página.");
      }

      // Detectar cambios en el controlador del SW
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        console.log("El controlador del Service Worker ha cambiado.");
      });
    } else {
      console.warn("El navegador no soporta Service Workers.");
    }
  }, []);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
