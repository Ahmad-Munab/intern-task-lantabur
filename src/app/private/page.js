"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
export const dynamic = "force-dynamic";

const PrivatePage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/login");
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Error occurred:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    const token = document.cookie
      ?.split("; ")
      ?.find((row) => row.startsWith("token="))
      ?.split("=")[1];
    if (!token) {
      router.push("/login");
    } else {
      fetchData();
    }
  }, [router]);

  function handleLogout() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    router.push("login");
  }

  return (
    <>
      {loading || !userData ? (
        <Spinner />
      ) : (
        <>
          <div className="flex flex-col gap-6">
            <h1 className="text-6xl text-gray-900 font-bold">Private Portal</h1>
            <Button
              onClick={handleLogout}
              className="bg-indigo-700 hover:bg-indigo-800 w-full text-3xl font-semibold py-8 "
            >
              Log out
            </Button>
          </div>
          <div className="items-start space-y-6 border shadow-lg rounded-lg p-8">
            <h1 className="text-6xl text-gray-900 text-center font-semibold">
              Hello {userData.lastName}
            </h1>

            <p className="text-3xl">Heres your information:</p>
            <div className="w-full flex flex-col space-y-4 text-2xl italic font-semibold text-gray-800">
              <p>First Name: {userData.firstName}</p>
              <p>Last Name: {userData.lastName}</p>
              <p>Email: {userData.email}</p>
              <p>Password: {userData.password}</p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PrivatePage;
