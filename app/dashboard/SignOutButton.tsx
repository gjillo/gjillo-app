'use client'

import {signOut} from "@node_modules/next-auth/react";
import Button from "@mui/material/Button";

export default function SignOutButton() {
  return (
    <Button
      variant="contained"
      onClick={() => signOut({callbackUrl: '/signin'})}
    >
      Sign out
    </Button>
  );
}