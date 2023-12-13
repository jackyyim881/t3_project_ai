import { api } from "~/trpc/server";
import { CreateProduct } from "./create-product";

export async function CrudCreateProduct() {
  const latestProduct = await api.product.getLatestProduct.query();
  return (
    <>
      <section className="grow">
        {latestProduct ? (
          <p className="truncate">
            Your most recent product: {latestProduct.name}
          </p>
        ) : (
          <p>You have no products yet.</p>
        )}
        <CreateProduct />
      </section>
    </>
  );
}
