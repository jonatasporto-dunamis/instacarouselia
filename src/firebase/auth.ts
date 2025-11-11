'use client';

import { Auth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const provider = new GoogleAuthProvider();

export async function signInWithGoogle(auth: Auth) {
  try {
    const result = await signInWithPopup(auth, provider);
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (credential) {
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // You can now use the user object and the token.
      console.log('Signed in user:', user);
      console.log('Access Token:', token);
    }
  } catch (error) {
    // Handle Errors here.
    const errorCode = (error as any).code;
    const errorMessage = (error as any).message;
    // The email of the user's account used.
    const email = (error as any).customData?.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error as any);
    console.error('Google Sign-In Error:', {
      errorCode,
      errorMessage,
      email,
      credential,
    });
    // Re-throw the error if you want calling code to handle it
    throw error;
  }
}
