import { signIn } from "next-auth/react";
import React from "react";

function useSignIn() {
  const handleSignIn = () => {
    signIn("google");
  };
  return handleSignIn;
}

export default useSignIn;
