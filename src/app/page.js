"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const isLoggedIn = document.cookie
    ?.split("; ")
    ?.find((row) => row.startsWith("token="))
    ?.split("=")[1];

  return (
    <main className="w-screen h-screen flex flex-col justify-start items-center my-20 space-y-10 ">
      <h1 className="text-6xl font-bold">This is a Public Page</h1>
      <Link href={"/private"}>
        <Button size="lg" className="text-3xl py-8">
          {!isLoggedIn && "Log in to "}Go to Private Page
        </Button>
      </Link>
    </main>
  );
}
