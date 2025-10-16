import type { ReactNode } from "react";

export const Widget = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm w-full h-auto pt-6 pb-[30px] pl-[18px] pr-[14px]">
      <h1 className="text-xl font-extrabold">{title}</h1>
      <div className="">{children}</div>
    </div>
  );
};
