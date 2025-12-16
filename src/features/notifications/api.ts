import { apiClient } from '@/shared/api/client'
import { Notification } from './types'

export const notificationsApi = {
    getNotifications: async (params?: {
        limit?: number
        offset?: number
        unreadOnly?: boolean
    }): Promise<{ notifications: Notification[]; total: number; unreadCount: number }> => {
        const query = new URLSearchParams()
        if (params?.limit) query.set('limit', params.limit.toString())
        if (params?.offset) query.set('offset', params.offset.toString())
        if (params?.unreadOnly) query.set('unreadOnly', 'true')

        return apiClient.get<{ notifications: Notification[]; total: number; unreadCount: number }>(
            `/notifications?${query}`
        )
    },

    markAsRead: async (id: number): Promise<void> => {
        return apiClient.patch(`/notifications/${id}/read`, {})
    },

    markAllAsRead: async (): Promise<void> => {
        return apiClient.patch('/notifications/read-all', {})
    },

    deleteNotification: async (id: number): Promise<void> => {
        return apiClient.delete(`/notifications/${id}`)
    },
}
