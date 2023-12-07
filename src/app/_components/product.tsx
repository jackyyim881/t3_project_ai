import { api } from "~/trpc/server";

type Product = {
  id: string;
  name: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  createdById: string;
};

export default function ProductList({ product , params }: { product: Product , params: any }) {  
      return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Cool Product Page</h1>
      <div className="max-w-md bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold">Product Name : {product.name}</h2>
          <p className="text-gray-500 text-sm">Price: {product.price}</p>
          product id : {params}
        </div>
        <img src="/path/to/product-image.jpg" alt="Product Image" className="w-full mb-4" />
        {/* Add to cart button */}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add to Cart
        </button>
      </div>
    </div>
  );
};
