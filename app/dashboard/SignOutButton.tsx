'use client'

import {signOut} from "@node_modules/next-auth/react";
import Button from "@mui/material/Button";
import LogoutIcon from '@mui/icons-material/Logout';

export default function SignOutButton() {
  return (
    <Button
      variant="contained"
      onClick={() => signOut({callbackUrl: '/signin'})}
      sx={{
        position: 'absolute',
        right: 25,
        top: 30,
        zIndex: 10,
      }}
    >
      <LogoutIcon />
    </Button>
  );
}