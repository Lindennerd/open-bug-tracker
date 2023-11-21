import { type ButtonHTMLAttributes, type DetailedHTMLProps } from "react";

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: "primary" | "secondary" | "danger" | "warning" | "success";
  disabled?: boolean;
  full?: boolean;
};

export const Button = (props: ButtonProps) => {
  const variantBg = () => {
    switch (props.variant) {
      case "primary":
        return "bg-blue-600 hover:bg-blue-500";
      case "secondary":
        return "bg-gray-600 hover:bg-gray-500";
      case "danger":
        return "bg-red-600 hover:bg-red-500";
      case "warning":
        return "bg-yellow-600 hover:bg-yellow-500";
      case "success":
        return "bg-green-600 hover:bg-green-500";
      default:
        return "bg-gray-600 hover:bg-gray-500";
    }
  };

  return (
    <button
      className={
        props.disabled
          ? `cursor-not-allowed rounded-md border  border-gray-600 p-1 opacity-50 ${
              props.full ? "w-full" : ""
            }`
          : `rounded-md border border-gray-600  px-2 py-1 text-white hover:border-gray-500 ${
              props.full ? "w-full" : ""
            } ${variantBg()}`
      }
      {...props}
    ></button>
  );
};
