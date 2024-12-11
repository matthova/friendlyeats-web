import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  linkWithPopup,
  updateProfile,
} from "firebase/auth";

import { auth } from "@/src/lib/firebase/clientApp";

export function onAuthStateChanged(cb) {
  return _onAuthStateChanged(auth, cb);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    if (auth.currentUser?.isAnonymous) {
      const result = await linkWithPopup(auth.currentUser, provider);
      updateProfile(auth.currentUser, {
        displayName:
          auth.currentUser.displayName ??
          result.user.providerData.find((p) => p.displayName).displayName,
        photoURL:
          auth.currentUser.photoURL ??
          result.user.providerData.find((p) => p.photoURL).photoURL,
      });
    } else {
      await signInWithPopup(auth, provider);
    }
  } catch (error) {
    console.error("Error signing in with Google", error);
  }
}

export async function signOut() {
  try {
    return auth.signOut();
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
}
