import React from "react";
import { routes } from "@/lib/routes";
import { SignedOut, SignedIn } from "@clerk/nextjs";
import { AccountCircleRounded, SvgIconComponent } from "@mui/icons-material";
import { Button } from "@mui/material";

type AuthButtonWrapperProps = {
  children: React.ReactNode;
  buttonLabel?: string;
  ButtonIcon?: SvgIconComponent;
  useDefaultIcon?: boolean;
};

export function AuthButtonWrapper({
  children,
  ButtonIcon,
  buttonLabel,
  useDefaultIcon = true,
}: AuthButtonWrapperProps) {
  return (
    <React.Fragment>
      <SignedOut>
        <Button
          color="secondary"
          variant="outlined"
          href={routes.signIn}
          startIcon={
            ButtonIcon ? (
              <ButtonIcon />
            ) : useDefaultIcon ? (
              <AccountCircleRounded />
            ) : null
          }
        >
          {buttonLabel ?? "Sign in"}
        </Button>
      </SignedOut>
      <SignedIn>{children}</SignedIn>
    </React.Fragment>
  );
}
