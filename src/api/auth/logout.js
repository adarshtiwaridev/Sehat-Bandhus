import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST() {
  const cookie = serialize("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });

  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });

  response.headers.set("Set-Cookie", cookie);
  return response;
}
