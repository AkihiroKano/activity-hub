import { apiClient } from '@/shared/api/client'
import { User } from './types'

export const usersApi = {
    getUsers: async (params?: {
        limit?: number
        offset?: number
        search?: string
    }): Promise<{ users: User[]; total: number }> => {
        const query = new URLSearchParams()
        if (params?.limit) query.set('limit', params.limit.toString())
        if (params?.offset) query.set('offset', params.offset.toString())
        if (params?.search) query.set('search', params.search)

        return apiClient.get<{ users: User[]; total: number }>(
            `/users?${query}`
        )
    },

    getUser: async (id: number): Promise<User> => {
        return apiClient.get<User>(`/users/${id}`)
    },

    updateUser: async (id: number, data: Partial<User>): Promise<User> => {
        return apiClient.put<User>(`/users/${id}`, data)
    },

    followUser: async (id: number): Promise<void> => {
        return apiClient.post(`/users/${id}/follow`, {})
    },

    unfollowUser: async (id: number): Promise<void> => {
        return apiClient.delete(`/users/${id}/follow`)
    },
}