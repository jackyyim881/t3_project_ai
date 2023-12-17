import { api } from "~/trpc/server";
import Button from "./Button";
import { NewFormProduct } from "./NewFormProduct";
import ProfileImage from "./ProfileImage";
import { getServerAuthSession } from "~/server/api/auth";
type Product = {
  id: string;
  name: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  createdById: string;
};

export default async function ProductList({
  product,
  params,
}: {
  product: Product;
  params: string;
}) {
  const session = await getServerAuthSession();

  return (
    <main className="mx-auto grid h-screen max-w-lg grid-cols-2 items-center gap-20 ">
      <div className="flex flex-col items-center justify-self-end">
        <h1 className="mb-4 text-2xl font-bold">Cool Product Page</h1>
        <div className="max-w-md rounded-lg bg-white p-6 shadow-md">
          <div className="mb-4">
            <h2 className="text-2xl font-bold">
              Product Name : {product.name}
            </h2>
            <p className="text-sm text-gray-500">Price: {product.price}</p>
            product id : {params}
          </div>

          <div className="flex space-x-2">
            <button className="rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
              Add to Cart
            </button>
            <Button className="self-end">Tweet</Button>
          </div>
        </div>
      </div>
      <div className="justify-self-start ">
        <ProfileImage session={session} width={100} height={200} />
        <NewFormProduct />
      </div>
    </main>
  );
}
