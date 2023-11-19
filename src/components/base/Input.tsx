import { type DetailedHTMLProps, type InputHTMLAttributes } from "react";

export type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { label?: string };

export const Input = (props: InputProps) => {
  return (
    <div className="flex flex-col gap-1">
      {props.label && (
        <label className="ml-1 font-semibold">{props.label}</label>
      )}
      <input
        type={props.type ?? "text"}
        className={`rounded border border-gray-500 bg-gray-800 px-2 py-1 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${props.className}`}
        {...props}
      />
    </div>
  );
};
