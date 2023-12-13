"use client";

import { api } from "~/trpc/react";
type RoleButtonProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

type Role = "Admin" | "User";

type SetRoleMutationConfig = {
  onSuccess: () => void;
  onError: () => void;
};

export const RoleButton: React.FC<{
  onClick: RoleButtonProps["onClick"];
  color: string;
  hoverColor: string;
  children: React.ReactNode;
}> = ({ onClick, color, hoverColor, children }) => (
  <button
    onClick={onClick}
    className={`rounded px-4 py-2 font-bold text-black hover:bg-${hoverColor} bg-${color}`}
  >
    {children}
  </button>
);

export function RoleAdmin({ session }: any) {
  // const setRoleAdmin = api.auth.setRoleAsAdmin.useMutation({
  //   onSuccess: () => {
  //     alert("Role set to admin");
  //   },
  //   onError: () => {
  //     alert("Failed to set role as admin");
  //   },
  // });
  // const setRoleUser = api.auth.setRoleAsUser.useMutation({
  //   onSuccess: () => {
  //     alert("Role set to user");
  //   },
  //   onError: () => {
  //     alert("Failed to set role as user");
  //   },
  // });

  const createSetRoleMutation = (role: Role): SetRoleMutationConfig => ({
    onSuccess: () => {
      alert(`Role set to ${role}`);
    },
    onError: () => {
      alert(`Failed to set role as ${role}`);
    },
  });

  const setRoleAdmin = api.auth.setRoleAsAdmin.useMutation(
    createSetRoleMutation("Admin"),
  );
  const setRoleUser = api.auth.setRoleAsUser.useMutation(
    createSetRoleMutation("User"),
  );

  const handleSetRoleAsAdmin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setRoleAdmin.mutate({ userId: session.user.id });
  };

  const handleSetRoleAsUser = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setRoleUser.mutate({ userId: session.user.id });
  };
  return (
    <>
      <h2 className="text-2xl font-bold">Set role</h2>
      <RoleButton
        onClick={handleSetRoleAsUser}
        color="blue-500"
        hoverColor="blue-700"
      >
        Set role as user
      </RoleButton>

      <RoleButton
        onClick={handleSetRoleAsAdmin}
        color="green-500"
        hoverColor="blue-700"
      >
        Set role as admin
      </RoleButton>
    </>
  );
}
