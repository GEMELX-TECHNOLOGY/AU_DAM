import { forwardRef, type ReactNode } from "react";
import AUDAM from "../../../assets/logo_audam.avif";

type FormProps = {
  title: string;
  subtitle: string;
  text: string;
  onClick?: () => void;
  children: ReactNode;
  question: string;
  action: string;
};

export const Form = forwardRef<HTMLDivElement, FormProps>(
  ({ title, subtitle, text, onClick, children, question, action }, ref) => {
    return (
      <div className=" w-full ">
        <div className="w-full pt-2.5 justify-center flex">
          <img src={AUDAM} className="w-[172px] h-[172px]" />
        </div>
        <div ref={ref}>
          <div className=" sm:pt-11 w-full  pt-5">
            <p className="font-light text-sm">{subtitle}</p>
            <h1 className="font-extrabold text-[28px]">{title}</h1>
            <p className="font-light text-sm text-gray-400  sm:w-auto">
              {text}
            </p>
            <div className="flex gap-6 flex-col">{children}</div>
          </div>

          <div className="flex gap-1 w-full items-center justify-center pt-11 text-sm sm:w-auto sm:text-base">
            <p className="font-extralight">¿{question}?</p>
            <a
              onClick={onClick}
              className="text-[#7B4B27] cursor-pointer font-bold hover:saturate-200 duration-300 transition-colors"
            >
              {action}
            </a>
          </div>
        </div>
      </div>
    );
  }
);

Form.displayName = "Form";
