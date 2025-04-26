import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth/cordova";
import { addDoc, collection, getFirestore } from "firebase/firestore/lite";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCdeJiwttp09fcPi8Vtq3pptoF9UogLqJ0",
  authDomain: "netflix-clone-4bb23.firebaseapp.com",
  projectId: "netflix-clone-4bb23",
  storageBucket: "netflix-clone-4bb23.firebasestorage.app",
  messagingSenderId: "782119334804",
  appId: "1:782119334804:web:42513d4843ac5e32bd9581"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (name, email, password) => {
    try {
       const res = await createUserWithEmailAndPassword(auth, email, password);
       const user = res.user;
       await addDoc(collection(db, "user"),{
        uid: user.uid,
        name,
        authProvider: "local",
        email,
       })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login =  async (email, password)=>{
    try {
       await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}
const logout = ()=>{
    signOut(auth);
}

export {auth, db, signUp, login, logout}