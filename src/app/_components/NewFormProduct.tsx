"use client";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { FavouriteButton } from "./FavouriteBtn";
import ProfileImage from "./ProfileImage";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { api } from "~/trpc/server";
import { useSession } from "next-auth/react";

function updateTextAreaSize(textArea?: HTMLTextAreaElement) {
  if (textArea == null) return;
  textArea.style.height = "0";
  textArea.style.height = `${textArea.scrollHeight}px`;
}

export default function NewFormProduct() {
  const textAreaRef = useRef<HTMLTextAreaElement>();
  const [isFavourite, setIsFavourite] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
    updateTextAreaSize(textArea);
    textAreaRef.current = textArea;
  }, []);
  // const btnAreaRef = useRef<HTMLButtonElement>();
  // const btnRef = useCallback((btnArea: HTMLButtonElement) => {
  //   btnAreaRef.current = btnArea;
  // }, []);
  useLayoutEffect(() => {
    updateTextAreaSize(textAreaRef.current);
  }, [inputValue]);
  const handleFavouriteClick = () => {
    setIsFavourite(!isFavourite);
  };
  return (
    <form className="relative flex flex-col gap-2  px-4 py-2">
      <h1>Discuss Form</h1>
      <div className="flex gap-4">
        <textarea
          style={{ height: 0 }}
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-glow resize-none overflow-hidden
          p-4 text-lg outline-none"
          placeholder="What you want to comment ..."
        />
      </div>
      <div>
        <FavouriteButton onClick={handleFavouriteClick} size={20}>
          Favourite
        </FavouriteButton>
      </div>
    </form>
  );
}
