import { useState } from "react";

type ButtonProps = {
  text: string;
  onClick?: () => void | Promise<void>;
};

export const Button = ({ text, onClick }: ButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (!onClick) return;

    try {
      setIsLoading(true);

      const delayPromise = new Promise((resolve) => setTimeout(resolve, 1000));

      await Promise.all([onClick(), delayPromise]);

      await onClick();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="relative flex items-center justify-center px-6 py-3 bg-green-700 hover:bg-green-600 text-white font-bold rounded-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed w-full "
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      ) : (
        text
      )}
    </button>
  );
};
