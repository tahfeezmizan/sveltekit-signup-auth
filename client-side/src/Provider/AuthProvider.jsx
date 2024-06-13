import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/Firebase.config";
import { API_URL } from "../constant";
import axios from "axios";

export const AuthContext = createContext();

// social login 
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const createUser = (email, password) => {
        setIsLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logInUser = (email, password) => {
        setIsLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    // google 
    const googleLogin = () => {
        setIsLoading(true)
        return signInWithPopup(auth, googleProvider);
    }

    // github 
const githubLogin = () => {
        setIsLoading(true)
        return signInWithPopup(auth, githubProvider);
    }

    // update user 
    const userProfileUpdate = (name, photoURL) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoURL
        })
    }

    // sing out user
    const logOut = () => {
        document.cookie = 'token' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        setUser(null);
        signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            const userEmail = currentUser?.email || user?.email;
            const loggedUser = { email: userEmail };

            if (currentUser) {
                setUser(currentUser);
                setIsLoading(false);
                console.log(currentUser);

                if (currentUser) {
                    axios.post(`${API_URL}/jwt `, loggedUser, { withCredentials: true })
                        .then(res => {
                            // console.log('token response', res.data);
                        })
                }
            }
            else {
                axios.post(`${API_URL}/logout `, loggedUser, { withCredentials: true })
                    .then(res => {
                        // console.log('LogOut token', res.data);
                    })
                setIsLoading(false)
            }
        });
        return () => unsubscribe()
    }, [])

    const authInfo = {
        user,
        isLoading,
        createUser,
        logInUser,
        googleLogin,
        githubLogin,
        userProfileUpdate,
        logOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;