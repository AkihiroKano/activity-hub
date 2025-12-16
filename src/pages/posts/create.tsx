import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaMapMarkerAlt, FaMusic, FaImage } from 'react-icons/fa'
import { PostEditor } from '@features/posts/components/post-editor'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { useQuery } from '@tanstack/react-query'
import { categoriesApi } from '@features/categories/api'

export function CreatePostPage() {
    const navigate = useNavigate()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { data: subcategories } = useQuery({
        queryKey: ['subcategories'],
        queryFn: () => categoriesApi.getSubcategories()
    })

    const handleSubmit = async (data: any) => {
        setIsSubmitting(true)
        try {
            // Имитация отправки данных
            console.log('Post data:', data)
            await new Promise(resolve => setTimeout(resolve, 2000))

            // Навигация обратно
            navigate('/posts')
        } catch (error) {
            console.error('Error creating post:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleCancel = () => {
        navigate('/posts')
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        onClick={handleCancel}
                        disabled={isSubmitting}
                    >
                        <FaArrowLeft className="mr-2" />
                        Назад
                    </Button>
                    <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
                        Создать пост
                    </h1>
                </div>
                <div className="flex items-center space-x-2 text-sm text-stone-600 dark:text-stone-400">
                    <span className="flex items-center">
                        <FaImage className="w-4 h-4 mr-1" />
                        0/10 фото
                    </span>
                    <span className="flex items-center">
                        <FaMapMarkerAlt className="w-4 h-4 mr-1" />
                        + локация
                    </span>
                    <span className="flex items-center">
                        <FaMusic className="w-4 h-4 mr-1" />
                        + плейлист
                    </span>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Содержание поста</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <PostEditor
                                subcategories={subcategories || []}
                                onSubmit={handleSubmit}
                                onCancel={handleCancel}
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Tips */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Советы</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-start space-x-3">
                                <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                                    <span className="text-amber-800 dark:text-amber-300 text-sm">1</span>
                                </div>
                                <p className="text-sm text-stone-600 dark:text-stone-400">
                                    Выбирайте релевантную подкатегорию для лучшего охвата
                                </p>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                                    <span className="text-amber-800 dark:text-amber-300 text-sm">2</span>
                                </div>
                                <p className="text-sm text-stone-600 dark:text-stone-400">
                                    Добавляйте теги для облегчения поиска
                                </p>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                                    <span className="text-amber-800 dark:text-amber-300 text-sm">3</span>
                                </div>
                                <p className="text-sm text-stone-600 dark:text-stone-400">
                                    Фотографии и локации повышают вовлеченность
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Rules */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Правила</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <p className="text-sm text-stone-600 dark:text-stone-400">
                                • Запрещен контент 18+
                            </p>
                            <p className="text-sm text-stone-600 dark:text-stone-400">
                                • Уважайте других пользователей
                            </p>
                            <p className="text-sm text-stone-600 dark:text-stone-400">
                                • Не размещайте личную информацию
                            </p>
                            <p className="text-sm text-stone-600 dark:text-stone-400">
                                • Соблюдайте авторские права
                            </p>
                        </CardContent>
                    </Card>

                    {/* Preview */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Предпросмотр</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="aspect-square bg-stone-100 dark:bg-stone-800 rounded-lg flex items-center justify-center">
                                <p className="text-stone-400 dark:text-stone-600 text-sm">
                                    Предпросмотр поста появится здесь
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default CreatePostPage