import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBn5gxhciU4RxstPqaWYCMEsNTgaM3w468",
  authDomain: "comfy-store-jmsh.firebaseapp.com",
  projectId: "comfy-store-jmsh",
  storageBucket: "comfy-store-jmsh.appspot.com",
  messagingSenderId: "55232976157",
  appId: "1:55232976157:web:0179035e5f5bc3966a3df4",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signUpLoginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result;
  } catch (error) {
    return error;
  }
};

export const logout = () => {
  signOut(auth)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};
