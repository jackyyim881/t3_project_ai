import { notFound } from "next/navigation";
import SideNav from "~/app/_components/SideNavbar";
import ProductList from "~/app/_components/product";
import { api } from "~/trpc/server";

type ProductPageProps = {
  params: {
    id: string;
  };
};

export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  const products = await api.product.getOneProductID.query({ id });

  console.log(products);
  if (!products) notFound();

  return (
    <div className=" relative mx-auto max-w-[1200px] ">
      <div className="  absolute h-screen border-r-4 ">
        <SideNav />
      </div>
      <ProductList product={products} params={id} />
    </div>
  );
}
