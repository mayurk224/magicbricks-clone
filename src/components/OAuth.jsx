import React from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth"
import {doc, getDoc, serverTimestamp, setDoc} from "firebase/firestore"
import { db } from "../../firebase";
import { useNavigate } from "react-router";

export default function OAuth() {
  const navigate = useNavigate();
  async function onGoogleClick(){
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      const docRef = doc(db,"users",user.uid);
      const docSnap = await getDoc(docRef);
      if(!docSnap.exists()){
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          timestamp: serverTimestamp(),
        })
      }
      localStorage.setItem('status', 'verified');
      navigate("/");
    } catch (error) {
      toast.error("Cant authorise user");
    }
  }
  return (
    <button
    type="button" onClick={onGoogleClick}
    className="w-full items-center flex justify-center text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
  >
    <FcGoogle className="text-xl mr-2" />
      Go on With Google
  </button>
  );
}
