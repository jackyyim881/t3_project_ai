"use client";

import { api } from "~/trpc/react";


export function RoleAdmin({ session , user }: any) {
  const setRoleAdmin = api.auth.setRoleAsAdmin.useMutation({
    onSuccess: () => {
      alert('Role set to admin');
    },
    onError: () => {
      alert('Failed to set role as admin');
    },
  });

  const handleSetRoleAsAdmin = () => {
    setRoleAdmin.mutate({ userId: session.user.id });
  };

  const setRoleUser = api.auth.setRoleAsBasic.useMutation({
    onSuccess: () => {
      alert('Role set to user');
    },
    onError: () => {
      alert('Failed to set role as user');
    },
  });

  const handleSetRoleAsUser = () => {
    setRoleUser.mutate({ userId: session.user.id });
  };

  return (
    <>
      <button onClick={handleSetRoleAsUser} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Set role as user
      </button>

      <button onClick={handleSetRoleAsAdmin} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Set role as admin
      </button>
    </>
  );
}
    

