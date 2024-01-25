'use client'

import { auth } from "@/services/firebaseConnection";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ReactNode, useEffect, useState } from "react";
import { createContext } from "react";

interface AuthContextProps{
    signed: boolean
    loading: boolean
    user: UserProps | null
    login: (email: string | null, name: string | null, uid: string) => void
    logout: () => void
}

interface UserProps{
    name: string | null
    email: string | null
    uid: string | null
}

export const AuthContext = createContext({} as AuthContextProps)

function AuthProvider({children} : { children : ReactNode }) {

    const [user, setUser] = useState<UserProps | null>(null)
    const [loading, setLoading] = useState(true)

    function login(email: string | null, name: string | null, uid: string){
        setUser({
            name,
            email,
            uid,
        })
    }   

    useEffect(() => {
        const onsub = onAuthStateChanged(auth, (user) => {
            if(user){
                const { displayName, email, uid } = user
                login(email, displayName, uid)
                setLoading(false)
            }else {
                setUser(null)
                setLoading(false)
            }
        })
        return () => {
            onsub()
        }
    },[])

    async function logout(){
        await signOut(auth)
    }

    return (
        <AuthContext.Provider value={{signed: !!user, loading, user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider