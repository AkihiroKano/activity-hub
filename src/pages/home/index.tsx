import { PostCard } from '@features/posts/components/post-card'
import { Button } from '@/shared/ui/button'
import { FaPlus, FaFire, FaClock, FaStar } from 'react-icons/fa'
import { useQuery } from '@tanstack/react-query'
import { postsApi } from '@features/posts/api'
import { categoriesApi } from '@features/categories/api'
import { usersApi } from '@/features/users/api'
import { User } from '@/features/users/types'

export function HomePage() {
    const { data: postsData } = useQuery({
        queryKey: ['posts', 'home'],
        queryFn: () => postsApi.getPosts({ limit: 4 })
    })

    const { data: categoriesData } = useQuery({
        queryKey: ['subcategories'],
        queryFn: () => categoriesApi.getSubcategories()
    })

    const { data: usersData } = useQuery({
        queryKey: ['users', 'home'],
        queryFn: () => usersApi.getUsers({ limit: 10 })
    })

    const posts = postsData?.posts || []
    const subcategories = categoriesData || []
    const users = usersData?.users || []

    return (
        <div className="space-y-6">
            {/* Hero Section */}
            <div className="rounded-2xl bg-gradient-to-r from-[#ffc09e] to-amber-300 p-8 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-amber-800 mb-4">
                    Добро пожаловать в ActivityHub!
                </h1>
                <p className="text-lg text-amber-800/90 mb-6 max-w-2xl mx-auto">
                    Платформа для обмена активностями, увлечениями и хобби. Находите единомышленников, делитесь опытом и открывайте новые горизонты.
                </p>
                <Button size="lg" className="bg-white text-amber-800 hover:bg-white/90">
                    <FaPlus className="mr-2" />
                    Начать делиться
                </Button>
            </div>

            {/* Filters */}
            <div className="flex items-center justify-between">
                <div className="flex space-x-2 overflow-x-auto pb-2">
                    <Button variant="primary" size="sm">
                        <FaFire className="mr-2" />
                        Популярное
                    </Button>
                    <Button variant="outline" size="sm">
                        <FaClock className="mr-2" />
                        Новое
                    </Button>
                    <Button variant="outline" size="sm">
                        <FaStar className="mr-2" />
                        Подписки
                    </Button>
                    <Button variant="outline" size="sm">
                        #мото
                    </Button>
                    <Button variant="outline" size="sm">
                        #дайвинг
                    </Button>
                    <Button variant="outline" size="sm">
                        #путешествия
                    </Button>
                </div>
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {posts.map(post => {
                    const author = users.find((author: User) => author.id === post.authorId)
                    const subcategory = subcategories.find(s => s.id === post.subcategoryId)

                    if (!author || !subcategory) return null

                    return (
                        <PostCard
                            key={post.id}
                            post={post}
                            author={{
                                id: author.id,
                                username: author.username,
                                avatar: author.avatar
                            }}
                            subcategory={{
                                id: subcategory.id,
                                name: subcategory.name,
                                color: '#a16207'
                            }}
                            onCommentClick={() => console.log('Comment clicked')}
                            onShareClick={() => console.log('Share clicked')}
                        />
                    )
                })}
            </div>

            {/* Categories Preview */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-6">
                    Популярные категории
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {[
                        { name: 'Мото', icon: '🏍️', color: 'bg-amber-100', count: '1.2K' },
                        { name: 'Дайвинг', icon: '🤿', color: 'bg-blue-100', count: '845' },
                        { name: 'Вело', icon: '🚴', color: 'bg-green-100', count: '723' },
                        { name: 'Альпинизм', icon: '🧗', color: 'bg-red-100', count: '512' },
                        { name: 'Фотография', icon: '📸', color: 'bg-purple-100', count: '1.5K' },
                        { name: 'Кемпинг', icon: '🏕️', color: 'bg-yellow-100', count: '934' },
                    ].map(category => (
                        <div
                            key={category.name}
                            className={`${category.color} rounded-xl p-4 text-center hover:shadow-lg transition-shadow cursor-pointer`}
                        >
                            <div className="text-3xl mb-2">{category.icon}</div>
                            <h3 className="font-semibold text-stone-900 mb-1">{category.name}</h3>
                            <p className="text-sm text-stone-600">{category.count} постов</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HomePage