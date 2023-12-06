"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";
import { PrismaClient } from '@prisma/client';


export default function ProductPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return (
    <div>
      <h1>Product Page I love you {id}</h1>
      <h1>{id}</h1>
    </div>
  );
}



