"use client";
import React from "react";
import Link from "next/link";

const SideNav: React.FC = () => {
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

export default SideNav;
