import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB7Thb1Ul6Ghh_XzevJPH4XnCmtWQbSRpk",
  authDomain: "netflix-clone-db108.firebaseapp.com",
  projectId: "netflix-clone-db108",
  storageBucket: "netflix-clone-db108.firebasestorage.app",
  messagingSenderId: "1001934287772",
  appId: "1:1001934287772:web:6ea9b84283ff46826cce59",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
        uid: user.uid,
        name, 
        authProvider: "local",
        email,
    })
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error);
        alert(error);
    }
}

const logout = () => {
    signOut(auth);
}

export { auth, db, login, signup, logout };