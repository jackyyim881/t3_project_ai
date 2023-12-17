import { api } from "~/trpc/server";
import React from "react";

interface ButtonRoleProps {
  onClick: () => void;
  label: string;
}

type SessionProps = {
  session: any;
};

export async function ButtonRole({ session }: SessionProps) {
  const handleSetRoleAdmin = async () => {
    await api.auth.setRoleAsAdmin.mutate({
      userId: session.user.id,
    });
  };

  const handleSetRoleUser = async () => {
    await api.auth.setRoleAsUser.mutate({
      userId: session.user.id,
    });
  };

  return (
    <>
      <button
        onClick={handleSetRoleUser}
        className="rounded bg-blue-500 px-4 py-2 font-bold text-black hover:bg-blue-700"
      >
        User
      </button>
      <button
        onClick={handleSetRoleAdmin}
        className="rounded bg-blue-500 px-4 py-2 font-bold text-black hover:bg-blue-700"
      >
        Admin
      </button>
    </>
  );
}

export default ButtonRole;
