import { generateToken } from "@/utils/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.text(); // Parse the entire request body
  const userData = JSON.parse(body); // Assuming the body is JSON

  const token = generateToken(userData);

  const response = NextResponse.json({
    message: "Login successful",
  });
  response.cookies.set("token", token);
  return response;
}
