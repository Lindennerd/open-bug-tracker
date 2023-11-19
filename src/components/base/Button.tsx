import { type ButtonHTMLAttributes, type DetailedHTMLProps } from "react";

export const Button = (
  props: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
) => {
  return (
    <button
      className={`rounded-md border border-gray-600 bg-gray-700 px-2 py-1 text-white hover:border-gray-500 ${props.className}`}
      {...props}
    ></button>
  );
};
