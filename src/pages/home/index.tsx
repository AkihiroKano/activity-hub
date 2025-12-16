import { PostCard } from '@features/posts/components/post-card'
import { Button } from '@/shared/ui/button'
import { FaPlus, FaFire, FaClock, FaStar, FaCompass } from 'react-icons/fa'
import { useQuery } from '@tanstack/react-query'
import { postsApi } from '@features/posts/api'
import { categoriesApi } from '@features/categories/api'
import { usersApi } from '@/features/users/api'
import { User } from '@/features/users/types'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/app/providers/auth-provider'

export function HomePage() {
    const navigate = useNavigate()
    const { user } = useAuth()

    const { data: postsData } = useQuery({
        queryKey: ['posts', 'home'],
        queryFn: () => postsApi.getPosts({ limit: 8, sortBy: 'date' })
    })

    const { data: popularPostsData } = useQuery({
        queryKey: ['posts', 'popular'],
        queryFn: () => postsApi.getPosts({ limit: 4, sortBy: 'popularity' })
    })

    const { data: categoriesData } = useQuery({
        queryKey: ['subcategories'],
        queryFn: () => categoriesApi.getSubcategories()
    })

    const { data: usersData } = useQuery({
        queryKey: ['users', 'home'],
        queryFn: () => usersApi.getUsers({ limit: 20 })
    })

    const posts = postsData?.posts || []
    const popularPosts = popularPostsData?.posts || []
    const subcategories = categoriesData || []
    const users = usersData?.users || []

    const getAuthor = (authorId: number) => {
        return users.find((author: User) => author.id === authorId)
    }

    const getSubcategory = (subcategoryId: number) => {
        const subcategory = subcategories.find(s => s.id === subcategoryId)
        if (!subcategory) return null

        const mainCategory = subcategory.mainCategoryId
        const color = getCategoryColor(mainCategory)

        return {
            id: subcategory.id,
            name: subcategory.name,
            color,
        }
    }

    const getCategoryColor = (categoryId: number) => {
        const colors = [
            '#a16207', // янтарный
            '#0ea5e9', // голубой
            '#8b5cf6', // фиолетовый
            '#10b981', // зеленый
            '#ef4444', // красный
            '#ec4899', // розовый
        ]
        return colors[(categoryId - 1) % colors.length]
    }

    return (
        <div className="space-y-6">
            {/* Hero Section */}
            <div className="rounded-2xl bg-gradient-to-r from-[#ffc09e] to-amber-300 p-8 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-amber-800 mb-4">
                    Добро пожаловать в ActivityHub!
                </h1>
                <p className="text-lg text-amber-800/90 mb-6 max-w-2xl mx-auto">
                    Платформа для обмена активностями, увлечениями и хобби.
                    {user ? ` Приветствуем, ${user.username}!` : ' Присоединяйтесь к сообществу единомышленников!'}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Button
                        size="lg"
                        className="bg-white text-amber-800 hover:bg-white/90"
                        onClick={() => navigate(user ? '/posts/create' : '/login')}
                    >
                        <FaPlus className="mr-2" />
                        {user ? 'Создать пост' : 'Начать'}
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="bg-white/20 text-amber-800 border-white hover:bg-white/30"
                        onClick={() => navigate('/categories')}
                    >
                        <FaCompass className="mr-2" />
                        Исследовать категории
                    </Button>
                </div>
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
                    {user && (
                        <Button variant="outline" size="sm">
                            <FaStar className="mr-2" />
                            Подписки
                        </Button>
                    )}
                    {['#мото', '#дайвинг', '#путешествия', '#горы'].map(tag => (
                        <Button key={tag} variant="outline" size="sm">
                            {tag}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Popular Posts */}
            {popularPosts.length > 0 && (
                <div>
                    <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center">
                        <FaFire className="mr-2 text-amber-500" />
                        Популярные посты
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {popularPosts.slice(0, 4).map(post => {
                            const author = getAuthor(post.authorId)
                            const subcategory = getSubcategory(post.subcategoryId)

                            if (!author || !subcategory) return null

                            return (
                                <div key={post.id} className="h-full">
                                    <PostCard
                                        post={post}
                                        author={{
                                            id: author.id,
                                            username: author.username,
                                            avatar: author.avatar
                                        }}
                                        subcategory={subcategory}
                                        onCommentClick={() => navigate(`/posts/${post.id}`)}
                                        onShareClick={() => console.log('Share clicked')}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}

            {/* Recent Posts */}
            <div>
                <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4">
                    Последние публикации
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {posts.map(post => {
                        const author = getAuthor(post.authorId)
                        const subcategory = getSubcategory(post.subcategoryId)

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
                                subcategory={subcategory}
                                onCommentClick={() => navigate(`/posts/${post.id}`)}
                                onShareClick={() => console.log('Share clicked')}
                            />
                        )
                    })}
                </div>
            </div>

            {/* Categories Preview */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-6">
                    Популярные категории
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {[
                        { id: 1, name: 'Мото', icon: '🏍️', color: 'bg-amber-100', count: '1.2K' },
                        { id: 2, name: 'Дайвинг', icon: '🤿', color: 'bg-blue-100', count: '845' },
                        { id: 8, name: 'Велотуризм', icon: '🚴', color: 'bg-green-100', count: '723' },
                        { id: 6, name: 'Альпинизм', icon: '🧗', color: 'bg-red-100', count: '512' },
                        { id: 7, name: 'Музыкальные фестивали', icon: '🎵', color: 'bg-purple-100', count: '1.5K' },
                        { id: 10, name: 'Кайтсерфинг', icon: '🪁', color: 'bg-yellow-100', count: '234' },
                    ].map(category => (
                        <div
                            key={category.name}
                            className={`${category.color} rounded-xl p-4 text-center hover:shadow-lg transition-shadow cursor-pointer`}
                            onClick={() => navigate(`/categories?subcategory=${category.id}`)}
                        >
                            <div className="text-3xl mb-2">{category.icon}</div>
                            <h3 className="font-semibold text-stone-900 mb-1">{category.name}</h3>
                            <p className="text-sm text-stone-600">{category.count} постов</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Active Users */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-6">
                    Активные пользователи
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                    {users.slice(0, 8).map((user: User) => (
                        <div
                            key={user.id}
                            className="bg-white dark:bg-stone-800 rounded-xl p-4 text-center hover:shadow-lg transition-shadow cursor-pointer"
                            onClick={() => navigate(`/profile?id=${user.id}`)}
                        >
                            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                                <span className="text-amber-800 dark:text-amber-200 font-semibold">
                                    {user.username.slice(0, 2).toUpperCase()}
                                </span>
                            </div>
                            <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-sm truncate">
                                {user.username}
                            </h3>
                            <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                                {user.bio.slice(0, 20)}...
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HomePage