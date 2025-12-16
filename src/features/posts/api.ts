import { apiClient } from '@/shared/api/client'
import { Post, CreatePostRequest, UpdatePostRequest } from './types'

export const postsApi = {
    getPosts: async (params?: {
        subcategoryId?: number
        userId?: number
        tag?: string
        limit?: number
        offset?: number
    }): Promise<{ posts: Post[]; total: number }> => {
        const query = new URLSearchParams()
        if (params?.subcategoryId) query.set('subcategoryId', params.subcategoryId.toString())
        if (params?.userId) query.set('userId', params.userId.toString())
        if (params?.tag) query.set('tag', params.tag)
        if (params?.limit) query.set('limit', params.limit.toString())
        if (params?.offset) query.set('offset', params.offset.toString())

        return apiClient.get<{ posts: Post[]; total: number }>(`/posts?${query}`)
    },

    getPost: async (id: number): Promise<Post> => {
        return apiClient.get<Post>(`/posts/${id}`)
    },

    createPost: async (data: CreatePostRequest): Promise<Post> => {
        return apiClient.post<Post>('/posts', data)
    },

    updatePost: async (id: number, data: UpdatePostRequest): Promise<Post> => {
        return apiClient.put<Post>(`/posts/${id}`, data)
    },

    deletePost: async (id: number): Promise<void> => {
        return apiClient.delete(`/posts/${id}`)
    },

    likePost: async (id: number): Promise<void> => {
        return apiClient.post(`/posts/${id}/like`, {})
    },

    unlikePost: async (id: number): Promise<void> => {
        return apiClient.delete(`/posts/${id}/like`)
    },
}
