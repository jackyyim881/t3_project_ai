"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

export function CreateProduct() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [content, setContent] = useState("");

  const createProduct = api.product.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
      setPrice(0);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createProduct.mutate({ name, price, content });
      }}
      className="mt-10 flex w-[300px] flex-col space-y-4"
    >
      <textarea
        className="flex-grow resize-none overflow-hidden rounded-md bg-gray-100 p-4 text-lg shadow-inner outline-none"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        className="flex-grow resize-none overflow-hidden rounded-md bg-gray-100 p-4 text-lg shadow-inner outline-none"
        placeholder="Product Price"
        value={price && Math.max(0, price)}
        onChange={(e) => setPrice(Number(e.target.value))}
      />
      <button type="submit" className="rounded-md bg-blue-500 p-4 text-white">
        Create Product
      </button>
    </form>
  );
}
