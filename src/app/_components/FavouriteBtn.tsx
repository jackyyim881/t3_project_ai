"use client";
import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { Button } from "~/@/components/ui/button";

type FavoriteButtonProps = {
  size?: number;
  children?: React.ReactNode;
  onClick?: () => void;
};
type SetLikeMutationConfig = {
  onSuccess: () => void;
  onError: () => void;
};

type Product = {
  productId: Products;
  // call Products
  product: Product;
};
type Products = {
  id: string;
  name: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  createdById: string;
};
export default function FavouriteButton({
  children,
  productId,
}: FavoriteButtonProps & Product) {
  //productId

  const router = useRouter();
  const handleMutationResult = (message: string) => {
    alert(message);
    router.refresh();
  };
  const [isFavourite, setIsFavourite] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  // const likeProductMutation = (productId: Product): SetLikeMutationConfig => ({
  //   onSuccess: () =>
  //     handleMutationResult(`Product liked ${productId.productId}`),
  //   onError: () =>
  //     handleMutationResult(`Failed to like product ${productId.productId}`),
  // });
  // const unLikeProductMutation = (
  //   productId: Product,
  // ): SetLikeMutationConfig => ({
  //   onSuccess: () =>
  //     handleMutationResult(`Product unliked ${productId.productId}`),
  //   onError: () =>
  //     handleMutationResult(`Failed to unlike product ${productId.productId}`),
  // });

  // const unLikeProductMutation = api.like.userUnlikeProduct.useMutation({
  //   onSuccess: () => {
  //     alert(`Product unliked successfully`);
  //     router.refresh();
  //   },
  //   onError: () => {
  //     alert(`Failed to unlike the product`);
  //     router.refresh();
  //   },
  // });
  // likeProductMutation like product
  // const likeProductMutation = api.like.toggleLike.useMutation({
  //   onSuccess: () => {
  //     setIsFavourite(true); // Update the isFavourite state here
  //     alert(`Product liked successfully`);
  //     router.refresh();
  //   },
  //   onError: () => {
  //     alert(`Failed to like the product`);
  //     router.refresh();
  //   },
  // });
  const toggleLike = api.like.toggleLike.useMutation();

  // Somewhere in your code where you call the mutation
  // const handleLikeProduct = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.stopPropagation();
  //   event.preventDefault();
  // }
  //   if (productId && productId.productId) {
  //     setIsFavourite(!isFavourite);
  //     console.log(productId);
  //     likeProductMutation.mutate({ productId: productId.productId });
  //   } else {
  //     console.error("productId is undefined");
  //   }
  // };

  // const handleLikeProduct = async (event: any) => {
  //   event.preventDefault();
  //   try {
  //     setIsFavourite(!isFavourite);
  //     const actualProductId = productId.id;

  //     if (!actualProductId) {
  //       throw new Error("Product ID is undefined");
  //     }

  //     const response = await toggleLike.mutateAsync({
  //       productId: actualProductId,
  //     });
  //     console.log(response);
  //     setIsFavourite(response.addedLike);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const handleLikeProduct = async (event: any) => {
    event.preventDefault();
    try {
      const response = await toggleLike.mutateAsync({
        productId: productId.id,
      });

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <div>{children}</div>
        <Button onClick={handleLikeProduct} className="flex gap-2">
          {isFavourite ? (
            <AiFillHeart color="red" size={20} />
          ) : (
            <AiOutlineHeart color="gray" size={20} />
          )}
          <span>Like</span>
        </Button>
      </div>
    </>
  );
}
