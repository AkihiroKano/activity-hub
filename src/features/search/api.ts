import { apiClient } from '@/shared/api/client'
import { User } from '@/features/users/types'
import { Post } from '@/features/posts/types'
import { Subcategory } from '@/features/categories/types'

export const searchApi = {
    search: async (query: string): Promise<{
        posts: Post[]
        users: User[]
        subcategories: Subcategory[]
    }> => {
        const searchQuery = new URLSearchParams()
        searchQuery.set('q', query)

        return apiClient.get<{
            posts: Post[]
            users: User[]
            subcategories: Subcategory[]
        }>(`/search?${searchQuery}`)
    },
}