'use client'

import Button, {ButtonProps} from "@mui/material/Button";
import {ReactNode} from 'react';
import {ClientSafeProvider, signIn} from "next-auth/react";
import GitHubIcon from '@mui/icons-material/GitHub';

const iconMap: { [x: string]: ReactNode | undefined } = {
  'github': <GitHubIcon />
}

type Props = {
  children?: ReactNode
  provider: ClientSafeProvider
} & ButtonProps;

export default function ProviderButton({children, provider, ...rest}: Props) {
  return (
    <Button
      {...rest}
      type="button"
      fullWidth
      variant="outlined"
      sx={{textTransform: "none"}}
      onClick={() => signIn(provider.id, {callbackUrl: '/dashboard'})}
      startIcon={iconMap[provider.id]}
    >{children}</Button>
  );
}