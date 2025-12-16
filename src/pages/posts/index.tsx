import { FaPlus, FaFilter, FaSort } from 'react-icons/fa'
import { PostCard } from '@features/posts/components/post-card'
import { Button } from '@/shared/ui/button'
import { Card, CardContent } from '@/shared/ui/card'
import { useQuery } from '@tanstack/react-query'
import { postsApi } from '@features/posts/api'
import { categoriesApi } from '@features/categories/api'
import { usersApi } from '@/features/users/api'
import { User } from '@/features/users/types'
import { useNavigate } from 'react-router-dom'

export function PostsPage() {
    const navigate = useNavigate()

    const { data: postsData } = useQuery({
        queryKey: ['posts'],
        queryFn: () => postsApi.getPosts({ limit: 20 })
    })

    const { data: subcategoriesData } = useQuery({
        queryKey: ['subcategories'],
        queryFn: () => categoriesApi.getSubcategories()
    })

    const { data: usersData } = useQuery({
        queryKey: ['users', 'posts'],
        queryFn: () => usersApi.getUsers({ limit: 50 })
    })

    const posts = postsData?.posts || []
    const subcategories = subcategoriesData || []
    const users = usersData?.users || []

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
                        Посты сообщества
                    </h1>
                    <p className="text-stone-600 dark:text-stone-400 mt-1">
                        Последние публикации от участников
                    </p>
                </div>
                <div className="flex items-center space-x-3">
                    <Button variant="outline">
                        <FaFilter className="mr-2" />
                        Фильтры
                    </Button>
                    <Button variant="outline">
                        <FaSort className="mr-2" />
                        Сортировка
                    </Button>
                    <Button onClick={() => navigate('/posts/create')}>
                        <FaPlus className="mr-2" />
                        Новый пост
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-wrap gap-2">
                        {['Все', 'Популярные', 'Новые', 'Подписки', 'С фото', 'С маршрутами'].map(
                            (filter) => (
                                <button
                                    key={filter}
                                    className="px-4 py-2 rounded-full text-sm font-medium transition-colors bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700"
                                >
                                    {filter}
                                </button>
                            )
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {posts.map((post) => {
                    const author = users.find((author: User) => author.id === post.authorId)
                    const subcategory = subcategories.find((s) => s.id === post.subcategoryId)

                    if (!author || !subcategory) return null

                    return (
                        <PostCard
                            key={post.id}
                            post={post}
                            author={author}
                            subcategory={{
                                id: subcategory.id,
                                name: subcategory.name,
                                color: '#a16207'
                            }}
                            onCommentClick={() => navigate(`/posts/${post.id}`)}
                            onShareClick={() => console.log(`Share post ${post.id}`)}
                        />
                    )
                })}
            </div>

            {/* Load More */}
            {posts.length > 0 && (
                <div className="text-center">
                    <Button variant="outline" size="lg">
                        Загрузить еще
                    </Button>
                </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card hover>
                    <CardContent className="p-6">
                        <div className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-2">
                            {postsData?.total || 0}
                        </div>
                        <div className="text-stone-600 dark:text-stone-400">
                            Постов опубликовано
                        </div>
                    </CardContent>
                </Card>
                <Card hover>
                    <CardContent className="p-6">
                        <div className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-2">
                            {posts.reduce((sum, post) => sum + post.likesCount, 0)}
                        </div>
                        <div className="text-stone-600 dark:text-stone-400">
                            Всего лайков
                        </div>
                    </CardContent>
                </Card>
                <Card hover>
                    <CardContent className="p-6">
                        <div className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-2">
                            {posts.reduce((sum, post) => sum + post.commentsCount, 0)}
                        </div>
                        <div className="text-stone-600 dark:text-stone-400">
                            Комментариев
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default PostsPage