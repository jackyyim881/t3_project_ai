"use client";
import React, { useState, ReactNode } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { api } from "~/trpc/server";
type FavoriteButtonProps = {
  size?: number;
  children?: React.ReactNode;
  onClick?: () => void;
};

export function FavouriteButton({
  children,
  size,
  onClick,
}: FavoriteButtonProps) {
  const [isFavourite, setIsFavourite] = useState(false);

  return (
    <div>
      <p>{children}</p>
      <button onClick={() => setIsFavourite(!isFavourite)}>
        {isFavourite ? (
          <AiFillHeart color="red" size={size} />
        ) : (
          <AiOutlineHeart color="gray" size={size} />
        )}
      </button>
    </div>
  );
}
