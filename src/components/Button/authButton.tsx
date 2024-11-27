// src/components/Button/Button.tsx
import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  children,
  disabled,
  className,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-[#FC4747] font-light text-white rounded-md px-6 py-3  disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
