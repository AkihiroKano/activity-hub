import { MAIN_CATEGORIES } from '@/shared/utils/constants'

export type MainCategory = typeof MAIN_CATEGORIES[number]

export interface Subcategory {
    id: number
    name: string
    description: string
    mainCategoryId: number
    createdByUserId: number
    isApproved: boolean
    moderators: number[]
    tags: string[]
    createdAt: string
}

export interface CategoryTree {
    mainCategory: MainCategory
    subcategories: Subcategory[]
}
