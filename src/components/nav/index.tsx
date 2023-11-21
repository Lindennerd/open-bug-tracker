import Link from "next/link";
import { User } from "./User";

export const Nav = () => {
  return (
    <nav className="flex flex-row items-center justify-between p-2">
      <Link href="/" className="text-2xl font-bold text-white">
        Open Bug Tracker
      </Link>
      <div className="flex items-center justify-center gap-2 text-center align-middle">
        <Link
          className="rounded-md p-2 text-center align-middle hover:bg-gray-700"
          type="button"
          href="/project/new"
        >
          Bring your Project
        </Link>
        <User />
      </div>
    </nav>
  );
};
