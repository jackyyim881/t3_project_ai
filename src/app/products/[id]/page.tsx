
import { notFound } from "next/navigation";
import ProductList from "~/app/_components/product";
import { api } from "~/trpc/server";

// _components directory has product.tsx/ 
// import ProductList from "~/app/_components/product";
type Product = {
  id: string;
  name: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  createdById: string;
};

type ProductProps = {  
  product: {  
    id: string;  
    name: string;  
    price: number;  
    // add other product fields you want to use  
  } | null;  
};  

type ProductPageProps = {
  params: {
    id: string;
  };
};
  




export default async function ProductPage({ params: {id} }  : ProductPageProps | any)  {
  const products =  await api.product.getOneProductID.query({id});
  if (!products) notFound();
  console.log(products);

  return (
    <ProductList product={products} params={id} />
  );  
}
