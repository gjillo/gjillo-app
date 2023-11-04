'use client'

import {signOut} from "@node_modules/next-auth/react";

export default function SignOutButton() {
  return <button onClick={() => signOut({callbackUrl: '/signin'})}>Sign out</button>
}