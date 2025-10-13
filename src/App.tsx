import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

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

  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
