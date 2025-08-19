import React from "react";
import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Sign up to start you learning journey",
};

export default function SignupPage() {
  return <SignUp />;
}
