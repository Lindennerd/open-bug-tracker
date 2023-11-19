import ReactMarkdown from "react-markdown";

export type EditorProps = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
};

export const Editor = (props: EditorProps) => {
  return (
    <>
      <div className="flex w-full flex-col gap-1">
        {props.label && (
          <label className="ml-1 font-semibold">{props.label}</label>
        )}
        <div className="flex w-full gap-1">
          <textarea
            placeholder="Markdown Text"
            className={`h-56 w-1/2 rounded border border-gray-500 bg-gray-800 px-2 py-1 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
          />
          <div className="h-56 w-1/2 overflow-auto rounded border border-gray-500 px-2">
            <ReactMarkdown className="prose prose-invert">
              {props.value}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </>
  );
};
