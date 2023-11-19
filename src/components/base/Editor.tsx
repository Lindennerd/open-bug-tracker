import ReactMarkdown from "react-markdown";

export type EditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export const Editor = (props: EditorProps) => {
  return (
    <>
      <div>
        <textarea
          className="bg-gray-600"
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
        />
        <ReactMarkdown className="prose">{props.value}</ReactMarkdown>
      </div>
    </>
  );
};
