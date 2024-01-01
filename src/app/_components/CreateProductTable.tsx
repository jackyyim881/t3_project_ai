import { api } from "~/trpc/server";
import { CreateProduct } from "./create-product";
import { Card } from "~/@/components/ui/card";

export async function CrudCreateProduct() {
  const latestProduct = await api.product.getLatestProduct.query();
  return (
    <>
      <div className="">
        {latestProduct ? (
          <p className="truncate">
            Your most recent product: {latestProduct.name}
          </p>
        ) : (
          <p>You have no products yet.</p>
        )}
        <CreateProduct />
      </div>
    </>
  );
}
