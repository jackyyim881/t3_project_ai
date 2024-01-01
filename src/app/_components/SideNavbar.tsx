"use client";
import Link from "next/link";

export default function SideNav() {
  return (
    <nav className="">
      <ul className="me-10 flex flex-col p-10">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </ul>
    </nav>
  );
}
