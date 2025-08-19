import React from "react";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import Button from "@mui/material/Button";
import { routes } from "@/lib/routes";
import { AccountCircleRounded } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";

export function AuthButton() {
  const user = useUser();
  return (
    <>
      <SignedIn>
        <Stack direction={"row"} gap={2} alignItems={"center"}>
          <UserButton />
          <Typography variant="subtitle2">
            {user
              ? user.user?.primaryEmailAddress?.emailAddress.split("@")[0]
              : ""}
          </Typography>
        </Stack>
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
