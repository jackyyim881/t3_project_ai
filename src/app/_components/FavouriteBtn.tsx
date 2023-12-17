"use client";
import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/server";
type FavoriteButtonProps = {
  size?: number;
  children?: React.ReactNode;
  onClick?: () => void;
};
type SetLIkeMutationConfig = {
  onSuccess: () => void;
  onError: () => void;
};

type Product = {
  id: string;
  name: string;
  price: number;
};

export default function FavouriteButton({
  children,
  size,
}: FavoriteButtonProps) {
  const router = useRouter();
  const [isFavourite, setIsFavourite] = useState(false);

  const likeProductMutation = (product: Product): SetLIkeMutationConfig => ({
    onSuccess: () => {
      alert(`Product liked ${product.id}`);
      router.refresh();
    },
    onError: () => {
      alert(`Failed to like product ${product.id}`);
      router.refresh();
    },
  });

  const handleLikeProduct = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    likeProductMutation({ id: "1", name: "test", price: 100 });
  };

  return (
    <div>
      <p>{children}</p>
      <button onClick={handleLikeProduct}>
        {isFavourite ? (
          <AiFillHeart color="red" size={size} />
        ) : (
          <AiOutlineHeart color="gray" size={size} />
        )}
      </button>
    </div>
  );
}
