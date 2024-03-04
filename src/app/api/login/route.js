// pages/api/auth/verifyToken.js

import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/auth";
import { cookies } from "next/headers";

export async function GET(req) {
  try {
    const token = cookies(req).get("token");
    if (!token) {
      return NextResponse.error("Error");
    }

    const userData = verifyToken(token.value);
    if (!userData) {
      return NextResponse.error("Error");
    }

    return NextResponse.json(userData);
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.error("Error");
  }
}
