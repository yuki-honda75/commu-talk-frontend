import React from "react";
import { createContext, useState, useContext, useEffect } from "react";
import { auth } from "../firebase";

const AuthContext = createContext({});

export function useAuthContext() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: any) {
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState<boolean>(true);

    const value = {
        user,
        loading,
    };
    
    useEffect(() => {
        const unsubscribed = auth.onAuthStateChanged((user: any) => {
            setUser(user);
            setLoading(false);
        });
        return () => {
            unsubscribed();
        };
    }, []);
    if (loading) {
        return <p>loading...</p>;
    } else {
        return <AuthContext.Provider value={value}>{! loading && children}</AuthContext.Provider>;
    }
};
