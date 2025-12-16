import React, { createContext, useContext, useState, useEffect } from 'react'
import { User } from '@features/auth/types'
import { authApi } from '@features/auth/api'

interface AuthContextType {
    user: User | null
    isLoading: boolean
    login: (email: string, password: string) => Promise<void>
    register: (email: string, password: string, username: string) => Promise<void>
    logout: () => Promise<void>
    updateUser: (updates: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const initAuth = async () => {
            try {
                const userData = await authApi.getCurrentUser()
                setUser(userData)
            } catch {
                setUser(null)
            } finally {
                setIsLoading(false)
            }
        }

        initAuth()
    }, [])

    const login = async (email: string, password: string) => {
        const userData = await authApi.login(email, password)
        setUser(userData)
    }

    const register = async (email: string, password: string, username: string) => {
        const userData = await authApi.register(email, password, username)
        setUser(userData)
    }

    const logout = async () => {
        await authApi.logout()
        setUser(null)
    }

    const updateUser = (updates: Partial<User>) => {
        setUser(prev => prev ? { ...prev, ...updates } : null)
    }

    return (
        <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
