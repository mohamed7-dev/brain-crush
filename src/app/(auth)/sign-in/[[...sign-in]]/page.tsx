import React from "react";
import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to start you learning journey",
};

export default function SignInPage() {
  return <SignIn />;
}
