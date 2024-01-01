import { api } from "~/trpc/server";
// import Button from "./Button";
import { NewFormProduct } from "./NewFormProduct";
import ProfileImage from "./ProfileImage";
import { getServerAuthSession } from "~/server/api/auth";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/@/components/ui/card";
import { Button } from "~/@/components/ui/button";
type Product = {
  id: string;
  name: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  createdById: string;
};

type ProductListProps = {
  product: Product;
  params: string;
};
export default async function ProductList({
  product,
  params,
}: ProductListProps) {
  const session = await getServerAuthSession();
  const products = await api.product.getOneProductID.query({ id: params });
  return (
    <main className="mx-auto grid min-h-screen  grid-cols-2 items-center gap-20 ">
      <Card className="flex max-w-md flex-col items-center justify-self-end">
        <CardHeader className="mt-4 text-2xl font-bold">
          Cool Product Page
        </CardHeader>
        <div className="max-w-md rounded-lg bg-white p-6 shadow-md">
          <CardTitle className="text-2xl font-bold">
            Product Name : {product.name}
          </CardTitle>
          <CardDescription className="text-sm ">
            Price: {product.price}
          </CardDescription>
          <CardDescription>product id : {params}</CardDescription>

          <div className="mt-10 flex w-[full] justify-between">
            <Button>Add to Cart</Button>
            <Button>Tweet</Button>
          </div>
        </div>
      </Card>
      <Card className="justify-self-start ">
        <ProfileImage session={session} width={30} height={20} />
        <NewFormProduct productId={products} />{" "}
      </Card>
    </main>
  );
}
