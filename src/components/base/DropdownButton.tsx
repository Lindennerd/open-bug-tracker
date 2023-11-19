import React from "react";
import { Button } from "./Button";

export type DropdownButtonProps = {
  label?: string;
  options: Array<{
    label: string | React.ReactNode;
    value: string;
  }>;
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export const DropdownButton = (props: DropdownButtonProps) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div className="flex flex-col">
      <Button onClick={() => setExpanded(!expanded)}>
        {props.value === "" ? "Selecionar" : props.value}
      </Button>
      {expanded && (
        <div className="absolute z-10 mt-10 w-full rounded border border-gray-500 bg-gray-800">
          {props.options.map((option, index) => (
            <button
              key={index}
              className="block w-full  px-2 py-1 text-left hover:bg-gray-700"
              onClick={() => {
                props.onChange(option.value);
                setExpanded(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
