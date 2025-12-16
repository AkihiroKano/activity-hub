import { apiClient } from '@/shared/api/client'
import { Comment, CreateCommentRequest } from './types'

export const commentsApi = {
    getPostComments: async (postId: number): Promise<Comment[]> => {
        return apiClient.get<Comment[]>(`/posts/${postId}/comments`)
    },

    createComment: async (data: CreateCommentRequest): Promise<Comment> => {
        return apiClient.post<Comment>('/comments', data)
    },

    updateComment: async (id: number, content: string): Promise<Comment> => {
        return apiClient.put<Comment>(`/comments/${id}`, { content })
    },

    deleteComment: async (id: number): Promise<void> => {
        return apiClient.delete(`/comments/${id}`)
    },

    likeComment: async (id: number): Promise<void> => {
        return apiClient.post(`/comments/${id}/like`, {})
    },

    unlikeComment: async (id: number): Promise<void> => {
        return apiClient.delete(`/comments/${id}/like`)
    },
}
