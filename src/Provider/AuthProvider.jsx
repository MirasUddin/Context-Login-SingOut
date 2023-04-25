import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from '../firebase.config';


export const AuthContext = createContext(null)




const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const provider = new GoogleAuthProvider();

    const auth = getAuth(app);

    const createUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const singIn = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password)
    }

    const singInWithGoogle = ()=>{
        return signInWithPopup(auth, provider);
    }

    const logOut = () =>{
        return signOut(auth)
    }


    const authInfo = {
        user,
        loading,
        createUser,
        singIn,
        singInWithGoogle,
        logOut
    }

    // observe auth state change
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            console.log("auth state change" ,currentUser);
            setUser(currentUser)
            setLoading(false)
        })
        return () =>{
            unsubscribe();
        }
    },[])

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;