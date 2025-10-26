"use client"
import { JwtPayloadInterface } from "@/helper/jwtHelper"
import {useContext, createContext } from "react"

const AuthContext = createContext<JwtPayloadInterface | null>(null)
interface AuthProviderInterface {
    auth: JwtPayloadInterface,
    children: React.ReactNode
}

export function AuthProvider({ auth, children } : AuthProviderInterface) {
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export function useAuth() {
    return useContext(AuthContext)
}