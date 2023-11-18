import { signIn, useSession } from "next-auth/react";
import Image from "next/image";

export const User = () => {
  const { data: session, status } = useSession();

  if (status === "authenticated" && session)
    return (
      <button className="flex gap-2 rounded p-1 text-white hover:bg-purple-800">
        <span className="mt-2">{`Hello ${session.user.name}`}</span>
        <Image
          className="rounded-full"
          src={session.user.image ?? ""}
          alt="User Image"
          width={42}
          height={42}
        />
      </button>
    );
  else
    return (
      <button
        className="rounded p-2 text-white hover:bg-purple-800"
        onClick={() => signIn("auth0")}
      >
        LogIn
      </button>
    );
};
