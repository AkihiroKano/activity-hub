import React from 'react'
import { FaHeart, FaRegHeart, FaComment, FaShare, FaBookmark, FaRegBookmark } from 'react-icons/fa'
import { Avatar } from '@/shared/ui/avatar'
import { Button } from '@/shared/ui/button'
import { Post } from '../types'
import { formatDate, truncateText } from '@/shared/utils/helpers'
import { useAuth } from '@/app/providers/auth-provider'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postsApi } from '../api'

interface PostCardProps {
    post: Post
    author: {
        id: number
        username: string
        avatar: string
    }
    subcategory: {
        id: number
        name: string
        color: string
    }
    onCommentClick?: () => void
    onShareClick?: () => void
}

export function PostCard({
    post,
    author,
    subcategory,
    onCommentClick,
    onShareClick
}: PostCardProps) {
    const { user } = useAuth()
    const queryClient = useQueryClient()
    const [liked, setLiked] = React.useState(false)
    const [bookmarked, setBookmarked] = React.useState(false)

    const likeMutation = useMutation({
        mutationFn: () => liked ? postsApi.unlikePost(post.id) : postsApi.likePost(post.id),
        onSuccess: () => {
            setLiked(!liked)
            queryClient.invalidateQueries({ queryKey: ['posts'] })
        },
    })

    const handleLike = () => {
        if (!user) return
        likeMutation.mutate()
    }

    return (
        <div className="border rounded-xl overflow-hidden bg-white/80 dark:bg-stone-800/60 backdrop-blur-sm">
            {/* Header */}
            <div className="p-4 border-b border-stone-200 dark:border-stone-700">
                <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                        <Avatar src={author.avatar} alt={author.username} fallback={author.username} />
                        <div>
                            <div className="flex items-center space-x-2">
                                <h3 className="font-semibold text-stone-900 dark:text-stone-100">
                                    {author.username}
                                </h3>
                                <span className="text-xs px-2 py-1 rounded-full"
                                    style={{ backgroundColor: `${subcategory.color}20`, color: subcategory.color }}>
                                    {subcategory.name}
                                </span>
                            </div>
                            <p className="text-sm text-stone-500 dark:text-stone-400">
                                {formatDate(post.createdAt)}
                            </p>
                        </div>
                    </div>

                    {user?.id === author.id && (
                        <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                                Редактировать
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mb-2">
                    {post.title}
                </h2>

                <p className="text-stone-700 dark:text-stone-300 mb-4">
                    {truncateText(post.content, 300)}
                </p>

                {/* Tags */}
                {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map(tag => (
                            <span
                                key={tag}
                                className="px-2 py-1 text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-full"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Photos */}
                {post.media.photos.length > 0 && (
                    <div className="mb-4">
                        <div className={`grid gap-2 ${post.media.photos.length === 1 ? 'grid-cols-1' :
                                post.media.photos.length === 2 ? 'grid-cols-2' :
                                    'grid-cols-2 md:grid-cols-3'
                            }`}>
                            {post.media.photos.slice(0, 3).map((photo, index) => (
                                <div key={index} className="relative aspect-square overflow-hidden rounded-lg">
                                    <img
                                        src={photo}
                                        alt={`Photo ${index + 1}`}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                                    />
                                    {index === 2 && post.media.photos.length > 3 && (
                                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                            <span className="text-white font-semibold">
                                                +{post.media.photos.length - 3}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Location */}
                {post.location && (
                    <div className="mb-4 p-3 bg-stone-50 dark:bg-stone-800/30 rounded-lg">
                        <p className="text-sm text-stone-600 dark:text-stone-400 flex items-center">
                            <span className="mr-2">📍</span>
                            {post.location.name}
                        </p>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-stone-200 dark:border-stone-700">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={handleLike}
                            disabled={likeMutation.isPending || !user}
                            className="flex items-center space-x-2 text-stone-600 dark:text-stone-400 hover:text-red-500 transition-colors disabled:opacity-50"
                        >
                            {liked ? (
                                <FaHeart className="w-5 h-5 text-red-500" />
                            ) : (
                                <FaRegHeart className="w-5 h-5" />
                            )}
                            <span>{post.likesCount + (liked && !likeMutation.isPending ? 1 : 0)}</span>
                        </button>

                        <button
                            onClick={onCommentClick}
                            className="flex items-center space-x-2 text-stone-600 dark:text-stone-400 hover:text-amber-500 transition-colors"
                        >
                            <FaComment className="w-5 h-5" />
                            <span>{post.commentsCount}</span>
                        </button>

                        <button
                            onClick={onShareClick}
                            className="flex items-center space-x-2 text-stone-600 dark:text-stone-400 hover:text-green-500 transition-colors"
                        >
                            <FaShare className="w-5 h-5" />
                            <span>Поделиться</span>
                        </button>
                    </div>

                    <button
                        onClick={() => setBookmarked(!bookmarked)}
                        className="text-stone-600 dark:text-stone-400 hover:text-amber-500 transition-colors"
                    >
                        {bookmarked ? (
                            <FaBookmark className="w-5 h-5 text-amber-500" />
                        ) : (
                            <FaRegBookmark className="w-5 h-5" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}
