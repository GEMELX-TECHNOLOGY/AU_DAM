import clsx from "clsx";

interface InputProps {
  label: string;
  placeholder?: string;
  type: string;
  value: string;
  isError?: boolean;
  onChange: (value: string) => void;
}

export const Input = ({
  label,
  placeholder,
  type,
  value,
  isError,
  onChange,
}: InputProps) => {
  return (
    <div className="relative">
      <input
        placeholder={placeholder}
        type={type}
        required
        id={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={clsx(
          "peer w-full  h-[47px] rounded-lg border border-gray-300 p-3.5 focus:border-green-700 focus:ring-1 focus:ring-green-700 outline-none transition-colors",
          isError && "border-red-500 text-red-500"
        )}
      />
      <label
        htmlFor={label}
        className={clsx(
          "pointer-events-none absolute left-3.5 bottom-9 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 bg-white px-2.5 peer-focus:bg-white peer-focus:text-green-700 peer-focus:-top-3 peer-focus:px-2.5 peer-focus:text-sm",
          isError && "text-red-500"
        )}
      >
        {label}
      </label>
    </div>
  );
};
