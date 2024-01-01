import Link from "next/link";
import { getServerAuthSession } from "~/server/api/auth";
import { api } from "~/trpc/server";
import SideNav from "~/app/_components/SideNavbar";
import PriceTag from "./_components/PriceTag";
import ProductName from "./_components/ProductName";
import { CheckUserRole } from "./_components/hooks/roleHooks";
import ProfileImage from "./_components/ProfileImage";
import { Button } from "~/@/components/ui/button";
import { Card } from "~/@/components/ui/card";
import { ScrollArea } from "~/@/components/ui/scroll-area";

export default async function Home() {
  const session = await getServerAuthSession();
  // refresh the router by using the checkuserrole
  return (
    <div className="container mx-auto flex  ">
      <ScrollArea className=" ms-4  min-h-screen   border-r-2">
        <SideNav />
      </ScrollArea>
      <div className=" flex w-[100%] flex-col">
        <ProfileImage session={session} width={30} height={30} />
        <div className=" p-10">
          <GetAllProduct />
        </div>
        <CheckUserRole />
      </div>
    </div>
  );
}
async function GetAllProduct() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const allProducts = await api.product.getAll.query();

  return (
    <div className="grid grid-cols-3 gap-4">
      {allProducts.length > 0 ? (
        allProducts.map((product: any) => (
          <Link
            href={`/products/${product.id}`}
            key={`${product.id}-${product.name}-${product.price}`}
          >
            <Card className=" w-[300px] p-5">
              <ProductName name={product.name} />
              <PriceTag price={product.price} />
              <Button>Click me</Button>
            </Card>
          </Link>
        ))
      ) : (
        <p>You have no products yet.</p>
      )}
    </div>
  );
}
