import { useState, type FormEvent } from "react";
import { Button, Input } from "../base";

export type SearchProjectProps = {
  currentSearch: string;
  onSearch: (name: string) => void;
};

export const SearchProject = (props: SearchProjectProps) => {
  const [name, setName] = useState(props.currentSearch);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    props.onSearch(name);
  }

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <Input
        placeholder="Search Project"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button type="submit">Search</Button>
    </form>
  );
};
