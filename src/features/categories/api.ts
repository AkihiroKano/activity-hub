import { apiClient } from '@/shared/api/client'
import { MainCategory, Subcategory, CategoryTree } from './types'

export const categoriesApi = {
    getMainCategories: async (): Promise<MainCategory[]> => {
        return apiClient.get<MainCategory[]>('/categories')
    },

    getCategoryTree: async (): Promise<CategoryTree[]> => {
        return apiClient.get<CategoryTree[]>('/categories/tree')
    },

    getSubcategories: async (mainCategoryId?: number): Promise<Subcategory[]> => {
        const url = mainCategoryId
            ? `/categories/${mainCategoryId}/subcategories`
            : '/subcategories'
        return apiClient.get<Subcategory[]>(url)
    },

    createSubcategory: async (data: Omit<Subcategory, 'id' | 'createdAt' | 'isApproved'>): Promise<Subcategory> => {
        return apiClient.post<Subcategory>('/subcategories', data)
    },

    updateSubcategory: async (id: number, data: Partial<Subcategory>): Promise<Subcategory> => {
        return apiClient.put<Subcategory>(`/subcategories/${id}`, data)
    },

    deleteSubcategory: async (id: number): Promise<void> => {
        return apiClient.delete(`/subcategories/${id}`)
    },

    toggleFavorite: async (subcategoryId: number): Promise<void> => {
        return apiClient.post(`/users/me/favorites/subcategories/${subcategoryId}`, {})
    },
}
