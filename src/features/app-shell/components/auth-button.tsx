import React from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Button from "@mui/material/Button";
import { routes } from "@/lib/routes";
import { AccountCircleRounded } from "@mui/icons-material";

export function AuthButton() {
  return (
    <>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <Button
          color="secondary"
          variant="outlined"
          href={routes.signIn}
          startIcon={<AccountCircleRounded />}
        >
          Sign in
        </Button>
      </SignedOut>
    </>
  );
}
