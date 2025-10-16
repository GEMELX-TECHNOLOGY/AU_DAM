import clsx from "clsx";

import type { ReactNode } from "react";

import { useRef } from "react";

import { gsap } from "gsap";

import { useGSAP } from "@gsap/react";

import { Link } from "react-router";

export const NavItem = ({
  name,

  to,

  icon,

  isActive,
}: {
  name: string;

  to: string;

  icon: ReactNode;

  isActive: boolean;
}) => {
  // 1. Crear referencias

  const containerRef = useRef(null);

  const barRef = useRef(null);

  const hoverTween = useRef<gsap.core.Tween | null>(null);

  // 2. Configurar GSAP con useGSAP

  useGSAP(
    () => {
      // Definir el estado inicial cuando no está activo.

      // Usamos 'scaleY: 0' si no está activo al montar.

      gsap.set(barRef.current, {
        scaleY: isActive ? 1 : 0,

        transformOrigin: "bottom", // Asegura que la animación crezca desde abajo
      });

      // Crear el tween (animación) para el hover y mantenerlo pausado.

      // Animará la barra a scaleY: 1 (tamaño completo).

      hoverTween.current = gsap.to(barRef.current, {
        scaleY: 1,

        duration: 0.3, // Duración de la animación

        ease: "power2.out", // Suavizado

        paused: true, // Importante: empieza pausado
      });
    },

    { scope: containerRef, dependencies: [isActive] }
  );

  // 3. Funciones para manejar el hover

  const onEnter = () => {
    // Solo animar si el elemento NO está activo.

    if (!isActive && hoverTween.current) {
      hoverTween.current.play(); // Inicia la animación
    }
  };

  const onLeave = () => {
    // Solo animar si el elemento NO está activo.

    if (!isActive && hoverTween.current) {
      // .reverse() revierte la animación al estado inicial (scaleY: 0).

      hoverTween.current.reverse();
    }
  };

  // Estilos base para el elemento

  const baseClasses =
    "flex w-full flex-row gap-3.5 items-center cursor-pointer";

  return (
    <Link
      to={to}
      className={`${baseClasses}}`}
      ref={containerRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div
        className={clsx(
          "flex flex-row h-[60px] gap-3.5 w-full py-[13px] items-center transition-all duration-300 rounded-md",

          isActive
            ? "bg-[#F2FFF9] text-green-800"
            : "ml-3 text-gray-600 hover:bg-green-100/50 hover:text-black" // Mantener hover para el color de fondo/texto
        )}
      >
        {/* --- Barra lateral animada --- */}

        <div
          ref={barRef} // Referencia GSAP
          // La clase isActive solo controla el estado inicial/activo,

          // GSAP se encarga de las transiciones de hover.

          className={clsx(
            "w-3 h-[60px] bg-green-800 rounded-r-md transform origin-bottom",

            isActive ? "scale-y-100" : "scale-y-0" // Estado inicial/activo
          )}
        ></div>

        {/* Renderiza el componente del ícono (ej. <Home size={20} />) */}

        <span className="mr-3">{icon}</span>

        <span className="text-sm">{name}</span>
      </div>
    </Link>
  );
};
