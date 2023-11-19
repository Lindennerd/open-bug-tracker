/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  useState,
  type DetailedHTMLProps,
  type InputHTMLAttributes,
} from "react";

export type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { label?: string };

export const Input = (props: InputProps) => {
  const [errors, setErrors] = useState<string[]>([]);

  const handleInvalid = (event: React.InvalidEvent<HTMLInputElement>) => {
    if (!event.target.validity.valid) {
      if (errors.some((error) => error === event.target.validationMessage))
        return;
      setErrors([...errors, event.target.validationMessage]);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      {props.label && (
        <label className="ml-1 font-semibold">{props.label}</label>
      )}
      <input
        required={props.required}
        onInvalid={handleInvalid}
        type={props.type ?? "text"}
        className={`rounded border border-gray-500 bg-gray-800 px-2 py-1 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${props.className}`}
        {...props}
      />
      {errors.length > 0 &&
        errors.map((error) => (
          <p key={error} className="text-sm text-red-500">
            {error}
          </p>
        ))}
    </div>
  );
};
