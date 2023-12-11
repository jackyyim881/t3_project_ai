"use client";

import { api } from "~/trpc/react";

export function RoleAdmin({ session }: any) {
  const setRoleAdmin = api.auth.setRoleAsAdmin.useMutation({
    onSuccess: () => {
      alert("Role set to admin");
    },
    onError: () => {
      alert("Failed to set role as admin");
    },
  });

  const handleSetRoleAsAdmin = () => {
    setRoleAdmin.mutate({ userId: session.user.id });
  };

  const setRoleUser = api.auth.setRoleAsUser.useMutation({
    onSuccess: () => {
      alert("Role set to user");
    },
    onError: () => {
      alert("Failed to set role as user");
    },
  });

  const handleSetRoleAsUser = () => {
    setRoleUser.mutate({ userId: session.user.id });
  };

  return (
    <>
      <button
        onClick={handleSetRoleAsUser}
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Set role as user
      </button>

      <button
        onClick={handleSetRoleAsAdmin}
        className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
      >
        Set role as admin
      </button>
    </>
  );
}
