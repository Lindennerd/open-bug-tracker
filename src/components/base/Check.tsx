import { type ChangeEvent } from "react";

export type CheckProps = {
  label?: string;
  checked?: boolean;
  onChecked: (checked: boolean) => void;
};

export const Check = (props: CheckProps) => {
  function handleOnChange(event: ChangeEvent<HTMLInputElement>): void {
    props.onChecked(event.target.checked);
  }

  return (
    <label className="flex cursor-pointer items-center">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={props.checked}
          onChange={handleOnChange}
        />
        <div className="block h-6 w-14 rounded-full bg-gray-600"></div>
        <div className="dot absolute left-1 top-1 h-4 w-4 translate-x-0 transform rounded-full bg-white transition-transform duration-200 ease-in-out"></div>
      </div>
      <span className="ml-3 ">{props.label}</span>
    </label>
  );
};
