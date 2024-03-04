"use client";

import AuthContainer from "@/components/auth-container";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-start items-center">
      <Link
        href="/"
        className=" text-center text-3xl hover:underline cursor-pointer rounded-md border p-2 m-2"
      >
        Home
      </Link>
      <AuthContainer />
    </div>
  );
};

export default LoginPage;
