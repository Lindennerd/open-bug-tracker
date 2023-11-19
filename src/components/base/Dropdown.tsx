export type DropdownProps = {
  label?: string;
  options: Array<{ label: string; value: string }>;
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export const Dropdown = (props: DropdownProps) => {
  return (
    <div className="flex flex-col gap-1">
      {props.label && (
        <label className="ml-1 font-semibold">{props.label}</label>
      )}
      <select
        className={`rounded border border-gray-500 bg-gray-800 px-2 py-1 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${props.className}`}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      >
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
