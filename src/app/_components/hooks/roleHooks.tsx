import { getServerAuthSession } from "~/server/api/auth";
import { RoleAdmin } from "../AdminButton";
import { CrudCreateProduct } from "../CreateProductTable";

type Role = {
  role: "ADMIN" | "USER";
};
export async function CheckUserRole() {
  const session = await getServerAuthSession();
  if (session?.user?.role !== "ADMIN") {
    return null;
  }
  return (
    <div className="flex items-center justify-center">
      <RoleAdmin session={session} />
      <CrudCreateProduct />
    </div>
  );
}
