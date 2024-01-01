"use client";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import FavouriteButton from "./FavouriteBtn";

function updateTextAreaSize(textArea?: HTMLTextAreaElement) {
  if (textArea == null) return;
  textArea.style.height = "0";
  textArea.style.height = `${textArea.scrollHeight}px`;
}

export function NewFormProduct({ productId }: any) {
  const textAreaRef = useRef<HTMLTextAreaElement>();
  const [isFavourite, setIsFavourite] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
    updateTextAreaSize(textArea);
    textAreaRef.current = textArea;
  }, []);

  useLayoutEffect(() => {
    updateTextAreaSize(textAreaRef.current);
  }, [inputValue]);
  const handleFavouriteClick = () => {
    setIsFavourite(!isFavourite);
  };
  //fetch productId from the product page
  console.log(productId);

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
        <FavouriteButton productId={productId}>Like Button</FavouriteButton>
      </div>
    </form>
  );
}
