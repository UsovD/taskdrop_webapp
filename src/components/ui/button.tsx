
import { ButtonHTMLAttributes, FC } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

const Button: FC<ButtonProps> = ({ children, variant = "default", className, ...props }) => {
  return (
    <button
      className={clsx(
        "px-4 py-2 rounded-xl text-sm font-medium",
        variant === "default" && "bg-blue-600 text-white",
        variant === "outline" && "border border-gray-600 text-white",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
