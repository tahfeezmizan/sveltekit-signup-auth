import { writable } from "svelte/store";
import { auth } from "../lib/firebase/firebase.config";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";


export const authStore = writable({
    isLoading: true,
    CurrentUser: null
});

export const authHandlers = {
    singup: async (email, password) => {
        await createUserWithEmailAndPassword(auth, email, password) 
    },
    logout: async () => {
        await signOut(auth)
    }
}