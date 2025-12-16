import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaHeart, FaRegHeart, FaComment, FaShare, FaBookmark, FaRegBookmark, FaMapMarkerAlt, FaCalendar, FaUser } from 'react-icons/fa'
import { Avatar } from '@/shared/ui/avatar'
import { Button } from '@/shared/ui/button'
import { Card, CardContent } from '@/shared/ui/card'
import { CommentList } from '@features/comments/components/comment-list'
import { formatDate } from '@/shared/utils/helpers'
import { useQuery } from '@tanstack/react-query'
import { postsApi } from '@features/posts/api'
import { commentsApi } from '@features/comments/api'
import { usersApi } from '@/features/users/api'
import { Skeleton } from '@/shared/ui/skeleton'

export function ViewPostPage() {
    const { id } = useParams<{ id: string }>()
    const postId = Number(id)
    const [liked, setLiked] = useState(false)
    const [bookmarked, setBookmarked] = useState(false)

    const { data: post, isLoading: postLoading } = useQuery({
        queryKey: ['post', postId],
        queryFn: () => postsApi.getPost(postId),
        enabled: !!postId
    })

    const { data: author, isLoading: authorLoading } = useQuery({
        queryKey: ['user', post?.authorId],
        queryFn: () => usersApi.getUser(post!.authorId),
        enabled: !!post?.authorId
    })

    const { data: comments, isLoading: commentsLoading } = useQuery({
        queryKey: ['comments', postId],
        queryFn: () => commentsApi.getPostComments(postId),
        enabled: !!postId
    })

    if (postLoading) {
        return (
            <div className="max-w-4xl mx-auto space-y-6">
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-64 w-full" />
            </div>
        )
    }

    if (!post) {
        return (
            <div className="max-w-4xl mx-auto text-center py-12">
                <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4">
                    Пост не найден
                </h1>
                <p className="text-stone-600 dark:text-stone-400 mb-6">
                    Запрошенный пост не существует или был удален
                </p>
                <Button onClick={() => window.history.back()}>
                    Вернуться назад
                </Button>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Post Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Button variant="outline" onClick={() => window.history.back()}>
                        ← Назад
                    </Button>
                    <div className="hidden md:block">
                        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                            {post.title}
                        </h1>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => setLiked(!liked)}
                        className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                    >
                        {liked ? (
                            <FaHeart className="w-5 h-5 text-red-500" />
                        ) : (
                            <FaRegHeart className="w-5 h-5 text-stone-500" />
                        )}
                        <span className="font-medium">
                            {post.likesCount + (liked ? 1 : 0)}
                        </span>
                    </button>
                    <button
                        onClick={() => setBookmarked(!bookmarked)}
                        className="p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                    >
                        {bookmarked ? (
                            <FaBookmark className="w-5 h-5 text-amber-500" />
                        ) : (
                            <FaRegBookmark className="w-5 h-5 text-stone-500" />
                        )}
                    </button>
                    <Button>
                        <FaShare className="mr-2" />
                        Поделиться
                    </Button>
                </div>
            </div>

            {/* Mobile Title */}
            <div className="md:hidden">
                <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                    {post.title}
                </h1>
            </div>

            {/* Author Info */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                        {authorLoading ? (
                            <Skeleton className="w-16 h-16 rounded-full" />
                        ) : (
                            <Avatar size="lg" src={author?.avatar} fallback={author?.username || 'U'} />
                        )}
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-100">
                                        {authorLoading ? (
                                            <Skeleton className="h-6 w-32" />
                                        ) : (
                                            author?.username || 'Пользователь'
                                        )}
                                    </h2>
                                    <p className="text-stone-600 dark:text-stone-400 mt-1">
                                        {authorLoading ? (
                                            <Skeleton className="h-4 w-48 mt-2" />
                                        ) : (
                                            author?.bio || 'Расскажите о себе...'
                                        )}
                                    </p>
                                </div>
                                <Button variant="outline" size="sm">
                                    <FaUser className="mr-2" />
                                    Подписаться
                                </Button>
                            </div>
                            <div className="flex items-center space-x-4 mt-4 text-sm text-stone-500 dark:text-stone-500">
                                <span className="flex items-center">
                                    <FaCalendar className="w-3 h-3 mr-1" />
                                    {formatDate(post.createdAt)}
                                </span>
                                <span>•</span>
                                <span>{post.likesCount} лайков</span>
                                <span>•</span>
                                <span>{post.commentsCount} комментариев</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Post Content */}
            <Card>
                <CardContent className="p-6">
                    <div className="prose prose-stone dark:prose-invert max-w-none">
                        <p className="whitespace-pre-line text-stone-700 dark:text-stone-300">
                            {post.content}
                        </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-6">
                        {post.tags.map(tag => (
                            <span
                                key={tag}
                                className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-full text-sm"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Photos */}
            {post.media.photos.length > 0 && (
                <Card>
                    <CardContent className="p-6">
                        <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-4">
                            Фотографии ({post.media.photos.length})
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {post.media.photos.map((photo, index) => (
                                <div key={index} className="aspect-square overflow-hidden rounded-lg">
                                    <img
                                        src={photo}
                                        alt={`Photo ${index + 1}`}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                                    />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Location */}
            {post.location && (
                <Card>
                    <CardContent className="p-6">
                        <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-4 flex items-center">
                            <FaMapMarkerAlt className="w-5 h-5 mr-2 text-red-500" />
                            Местоположение
                        </h3>
                        <div className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-lg">
                            <p className="text-stone-700 dark:text-stone-300">
                                {post.location.name}
                            </p>
                        </div>
                        <div className="h-64 mt-4 bg-stone-200 dark:bg-stone-700 rounded-lg flex items-center justify-center">
                            <p className="text-stone-500 dark:text-stone-400">
                                Карта будет отображаться здесь
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Comments */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-semibold text-stone-900 dark:text-stone-100 flex items-center">
                            <FaComment className="w-5 h-5 mr-2" />
                            Комментарии ({comments?.length || 0})
                        </h3>
                        <Button variant="outline" size="sm">
                            Сначала новые
                        </Button>
                    </div>
                    {commentsLoading ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="space-y-2">
                                    <Skeleton className="h-16 w-full" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <CommentList comments={comments || []} postId={post.id} />
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default ViewPostPage