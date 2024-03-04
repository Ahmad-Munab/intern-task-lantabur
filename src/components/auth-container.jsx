"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AuthContainer() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleMode = () => {
    setIsSignUp((prevState) => !prevState);
  };

  const router = useRouter();

  const modeText = isSignUp ? "Sign Up" : "Sign In";
  const altModeText = isSignUp ? "Sign In" : "Sign Up";
  const alreadyHaveAccountText = isSignUp
    ? "Already have an account?"
    : "Don't have an account?";
  const bottomLinkText = isSignUp ? "Login" : "Sign up";

  const handleSubmit = async () => {
    if (!password || (!email && (isSignUp ? !firstName || !lastName : false))) {
      toast.error("Please fill out the entire form");
      return;
    }
    try {
      toast.loading("Creating account..");
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, firstName, lastName }),
      });

      if (response.ok) {
        toast.remove();
        toast.success("Account successfully created");
        router.push("/private");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <div className="w-full max-w-[400px] space-y-6 my-32 border rounded-xl p-6 shadow-xl">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-bold">{modeText}</h2>
        <p className="text-gray-500 dark:text-gray-400">
          {`Enter your information to ${modeText.toLowerCase()} an account`}
        </p>
      </div>
      <div>
        {" "}
        {isSignUp && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  id="first-name"
                  placeholder="Lee"
                  required
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  id="last-name"
                  placeholder="Robinson"
                  required
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="m@example.com"
              required
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              required
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <Button className="w-full my-6" onClick={handleSubmit}>
          {modeText}
        </Button>
      </div>
      {/* <Separator className="mx-auto" /> */}
      <div className="space-y-4">
        <div className="text-center text-sm">
          {`${alreadyHaveAccountText}`}
          <p className="underline cursor-pointer" onClick={toggleMode}>
            {`${bottomLinkText}`}
          </p>
        </div>
      </div>
    </div>
  );
}
