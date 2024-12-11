"use client";
import { getAuth, signInAnonymously } from "firebase/auth";
import { useRouter } from "next/navigation";
import React from "react";

export function AuthWrapper({ children, isLoggedIn }) {
  const initialized = React.useRef(false);
  const router = useRouter();

  React.useEffect(() => {
    if (initialized.current || isLoggedIn) return;
    initialized.current = true;

    async function createAnonymousUser() {
      await signInAnonymously(getAuth());
      router.replace(window.location.pathname);
    }

    createAnonymousUser();
  }, [isLoggedIn]);

  return <>{children}</>;
}
