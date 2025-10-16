import clsx from "clsx";
import BACKGROUND from "../../assets/bg-login.avif";
import { Form } from "./components/Form";
import { useEffect, useRef, useState } from "react";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import gsap from "gsap";
import { useNavigate } from "react-router";

function Login() {
  //HOOKS
  const navigate = useNavigate();
  // USER CREDENTIALS
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  //  ERROR HANDLING
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // FORMS STATE
  const [showReset, setShowReset] = useState(false);
  const [showSendEmail, setShowSendEmail] = useState(false);

  // FORM REFERENCES
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const loginRef = useRef<HTMLDivElement>(null);
  const resetRef = useRef<HTMLDivElement>(null);
  const sendEmailRef = useRef<HTMLDivElement>(null);

  // Login input animation (only runs if there is no reset or sendEmail active)
  useEffect(() => {
    if (
      loginRef.current &&
      !showReset &&
      !showSendEmail &&
      containerRef.current
    ) {
      gsap.from(loginRef.current, {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });
      gsap.to(loginRef.current, {
        x: 0,
        opacity: 1,
        duration: 1,
      });
    }
  }, [showReset, showSendEmail]);

  useEffect(() => {
    if (showReset && containerRef.current) {
      gsap.from(resetRef.current, {
        x: 50,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      });
    }
  }, [showReset]);

  useEffect(() => {
    if (showSendEmail && containerRef.current) {
      gsap.from(sendEmailRef.current, {
        x: 50,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [showSendEmail]);

  // Funciones OTP
  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (value && index < otpRefs.current.length - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  /* ================= NAVIGATION BETWEEN FORMS ==============*/

  const handleBackToLogin = (
    stateSetter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (showReset) {
      gsap.to(resetRef.current, {
        x: 50,
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          stateSetter(false);
          gsap.set(containerRef.current, { x: 0, opacity: 1 });
        },
      });
    }
    if (showSendEmail) {
      gsap.to(sendEmailRef.current, {
        x: 50,
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          stateSetter(false);
          gsap.set(containerRef.current, { x: 0, opacity: 1 });
        },
      });
    }
  };

  const handleShowReset = () => {
    if (containerRef.current) {
      gsap.to(resetRef.current, {
        x: -50,
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          setShowReset(true);
          gsap.set(containerRef.current, { x: 0, opacity: 1 });
          setEmail("");
          setPassword("");
        },
      });
    }
  };

  const handleSendEmail = () => {
    if (containerRef.current) {
      gsap.to(sendEmailRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          setShowReset(false);
          setShowSendEmail(true);
          gsap.set(containerRef.current, { x: 0, opacity: 1 });
        },
      });
    }
  };

  /* ================= API request logic ==============*/
  const handleLogin = () => {
    try {
      localStorage.setItem("role", "warehouse");
      console.log(`Iniciando sesión: ${email} ${password}`);
      navigate("/");
    } catch {
      setError("Ha ocurrido un error");
    }
  };

  const handleChangePassword = () => {
    console.log("Verificando OTP...");
  };

  return (
    <div
      className="flex justify-center items-center h-dvh bg-cover bg-center"
      style={{ backgroundImage: `url(${BACKGROUND})` }}
    >
      <div
        ref={containerRef}
        className="flex bg-white w-full h-full sm:w-[467px] sm:h-[702px] sm:rounded-lg shadow-2xl px-6"
      >
        {/**** LOGIN ****/}
        {!showReset && !showSendEmail && (
          <Form
            title="Iniciar sesión"
            subtitle="Bienvenido nuevamente"
            text="Nos alegra verte, ingresa con tu cuenta"
            question="Has olvidado tu contraseña"
            action="Reestablecela"
            ref={loginRef}
            onClick={handleShowReset}
          >
            <div>
              <h3
                className={clsx(
                  "text-sm font-semibold text-red-600 opacity-0 transition-opacity duration-300",
                  isError && "opacity-100"
                )}
              >
                {isError ? error : "\u00A0"}
              </h3>
            </div>
            <div className="flex flex-col gap-4">
              <Input
                label="Ingresa tu correo electrónico"
                placeholder=""
                type="email"
                value={email}
                isError={isError}
                onChange={(val) => {
                  setEmail(val);
                  if (isError) setIsError(false);
                }}
              />

              <Input
                label="Ingresa tu contraseña"
                placeholder=""
                type="password"
                value={password}
                isError={isError}
                onChange={(val) => {
                  setPassword(val);
                  if (isError) setIsError(false);
                }}
              />
            </div>
            <Button text="Iniciar sesión" onClick={handleLogin} />
          </Form>
        )}

        {/**** RESET PASSWORD ****/}
        {showReset && (
          <Form
            ref={resetRef}
            title="¿Olvidaste tu contraseña?"
            subtitle="Recuperar contraseña"
            text="Para ayudarte a recuperar tu contraseña es necesario que ingreses tu correo electrónico para poder enviarte un código de verificación."
            question="Se trata de un error"
            action="Inicia sesión"
            onClick={() => handleBackToLogin(setShowReset)}
          >
            <div>
              <h3
                className={clsx(
                  "text-sm font-semibold text-red-600 opacity-0 transition-opacity duration-300",
                  isError && "opacity-100"
                )}
              >
                {isError ? error : "\u00A0"}
              </h3>
            </div>
            <div className="">
              <Input
                label="Ingresa tu correo electrónico"
                placeholder=""
                type="email"
                value={email}
                isError={isError}
                onChange={(val) => {
                  setEmail(val);
                  if (isError) setIsError(false);
                }}
              />
            </div>
            <Button text="Enviar" onClick={handleSendEmail} />
          </Form>
        )}

        {/**** SEND CODE OTP ****/}
        {showSendEmail && (
          <Form
            ref={sendEmailRef}
            title="Verificar correo"
            subtitle="Recuperar contraseña"
            text="Ingresa el código de verificación que enviamos a tu correo electrónico para reestablecer tu contraseña"
            question="Se trata de un error"
            action="Inicia sesión"
            onClick={() => handleBackToLogin(setShowSendEmail)}
          >
            <div>
              <h3
                className={clsx(
                  "text-sm font-semibold text-red-600 opacity-0 transition-opacity duration-300",
                  isError && "opacity-100"
                )}
              >
                {isError ? error : "\u00A0"}
              </h3>
            </div>
            <div className="flex gap-3.5 justify-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    otpRefs.current[i] = el;
                  }}
                  type="text"
                  maxLength={1}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl text-2xl font-bold text-center border border-gray-400 focus:border-[#7B4B27] outline-none"
                  onChange={(e) => handleOtpChange(e, i)}
                  onKeyDown={(e) => handleOtpKeyDown(e, i)}
                />
              ))}
            </div>
            <Button onClick={handleChangePassword} text="Verificar código" />
          </Form>
        )}
      </div>
    </div>
  );
}

export default Login;
