import { useState } from 'react'
import { FaPlus, FaSearch, FaFilter } from 'react-icons/fa'
import { CategoryTree } from '@features/categories/components/category-tree'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { useQuery } from '@tanstack/react-query'
import { categoriesApi } from '@features/categories/api'

export function CategoriesPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [showOnlyApproved, setShowOnlyApproved] = useState(true)

    const { data: categoryTreeData } = useQuery({
        queryKey: ['categoryTree'],
        queryFn: () => categoriesApi.getCategoryTree()
    })

    const { data: subcategoriesData } = useQuery({
        queryKey: ['subcategories'],
        queryFn: () => categoriesApi.getSubcategories()
    })

    const filteredCategoryTree = categoryTreeData?.map(item => ({
        mainCategory: item.mainCategory,
        subcategories: item.subcategories
            .filter(sc => !searchQuery ||
                sc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                sc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                sc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
            )
            .filter(sc => showOnlyApproved ? sc.isApproved : true)
    })).filter(item => item.subcategories.length > 0) || []

    const handleSubcategoryClick = (subcategory: any) => {
        console.log('Clicked subcategory:', subcategory)
        // Навигация к постам категории
    }

    const handleFavoriteToggle = (subcategoryId: number) => {
        console.log('Toggle favorite:', subcategoryId)
        // Добавление/удаление из избранного
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
                        Категории
                    </h1>
                    <p className="text-stone-600 dark:text-stone-400 mt-1">
                        Исследуйте активности по категориям
                    </p>
                </div>
                <Button>
                    <FaPlus className="mr-2" />
                    Предложить подкатегорию
                </Button>
            </div>

            {/* Search and Filters */}
            <Card>
                <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
                            <Input
                                placeholder="Поиск категорий, тегов, описаний..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex items-center space-x-4">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={showOnlyApproved}
                                    onChange={(e) => setShowOnlyApproved(e.target.checked)}
                                    className="rounded border-stone-300 dark:border-stone-700 text-amber-500 focus:ring-amber-500"
                                />
                                <span className="text-sm text-stone-700 dark:text-stone-300">
                                    Только одобренные
                                </span>
                            </label>
                            <Button variant="outline" size="sm">
                                <FaFilter className="mr-2" />
                                Фильтры
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Category Tree */}
            <Card>
                <CardHeader>
                    <CardTitle>Дерево категорий</CardTitle>
                </CardHeader>
                <CardContent>
                    <CategoryTree
                        categories={filteredCategoryTree}
                        onSubcategoryClick={handleSubcategoryClick}
                        onFavoriteToggle={handleFavoriteToggle}
                    />
                </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card hover>
                    <CardContent className="p-6">
                        <div className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-1">
                            {categoryTreeData?.length || 0}
                        </div>
                        <div className="text-sm text-stone-600 dark:text-stone-400">
                            Основных категорий
                        </div>
                    </CardContent>
                </Card>
                <Card hover>
                    <CardContent className="p-6">
                        <div className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-1">
                            {subcategoriesData?.length || 0}
                        </div>
                        <div className="text-sm text-stone-600 dark:text-stone-400">
                            Подкатегорий
                        </div>
                    </CardContent>
                </Card>
                <Card hover>
                    <CardContent className="p-6">
                        <div className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-1">
                            {subcategoriesData?.filter(s => s.isApproved).length || 0}
                        </div>
                        <div className="text-sm text-stone-600 dark:text-stone-400">
                            Одобренных подкатегорий
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default CategoriesPage