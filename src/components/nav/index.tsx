import Link from "next/link";
import { SearchBar } from "./SearchBar";
import { User } from "./User";

export const Nav = () => {
  return (
    <nav className="flex flex-row justify-between px-4 py-2">
      <Link href="/" className="text-2xl font-bold text-white">
        Open Bug Tracker
      </Link>
      <div className="flex gap-2">
        <SearchBar />
        <User />
      </div>
    </nav>
  );
};
