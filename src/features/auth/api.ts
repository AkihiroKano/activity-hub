import { apiClient } from '@/shared/api/client'
import { User, AuthResponse } from './types'

export const authApi = {
    login: async (email: string, password: string): Promise<User> => {
        const response = await apiClient.post<AuthResponse>('/auth/login', { email, password })
        localStorage.setItem('token', response.token)
        return response.user
    },

    register: async (email: string, password: string, username: string): Promise<User> => {
        const response = await apiClient.post<AuthResponse>('/auth/register', { email, password, username })
        localStorage.setItem('token', response.token)
        return response.user
    },

    logout: async (): Promise<void> => {
        await apiClient.post('/auth/logout', {})
        localStorage.removeItem('token')
    },

    getCurrentUser: async (): Promise<User> => {
        return apiClient.get<User>('/users/me')
    },

    updateProfile: async (data: Partial<User>): Promise<User> => {
        return apiClient.put<User>('/users/me', data)
    },

    changePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
        return apiClient.put('/users/me/password', { currentPassword, newPassword })
    },
}