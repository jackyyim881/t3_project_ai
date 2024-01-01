import { getServerAuthSession } from "~/server/api/auth";
import { RoleAdmin } from "../AdminButton";
import { CrudCreateProduct } from "../CreateProductTable";
import { Card } from "~/@/components/ui/card";

export async function CheckUserRole() {
  const session = await getServerAuthSession();
  if (session?.user?.role !== "ADMIN") {
    return null;
  }

  return (
    <Card className="m-2 max-w-[400px]   p-4">
      <RoleAdmin session={session} />
      <CrudCreateProduct />
    </Card>
  );
}
