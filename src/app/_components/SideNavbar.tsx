"use client";
import Link from "next/link";

export default function SideNav() {
  return (
    <nav className="">
      <ul className="flex p-10 me-10 flex-col">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </ul>
    </nav>
  );
};

