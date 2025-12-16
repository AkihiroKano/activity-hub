import { FaHeart, FaComment, FaUserPlus, FaExclamationTriangle, FaAt } from 'react-icons/fa'
import { Avatar } from '@/shared/ui/avatar'
import { Button } from '@/shared/ui/button'
import { Notification } from '../types'
import { formatDate } from '@/shared/utils/helpers'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { notificationsApi } from '../api'

interface NotificationListProps {
    notifications: Notification[]
    onClose?: () => void
}

export function NotificationList({ notifications, onClose }: NotificationListProps) {
    const queryClient = useQueryClient()

    const markAsReadMutation = useMutation({
        mutationFn: notificationsApi.markAsRead,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] })
        },
    })

    const markAllAsReadMutation = useMutation({
        mutationFn: notificationsApi.markAllAsRead,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] })
        },
    })

    const getIcon = (type: Notification['type']) => {
        switch (type) {
            case 'like':
                return <FaHeart className="w-5 h-5 text-red-500" />
            case 'comment':
                return <FaComment className="w-5 h-5 text-blue-500" />
            case 'follow':
                return <FaUserPlus className="w-5 h-5 text-green-500" />
            case 'mention':
                return <FaAt className="w-5 h-5 text-purple-500" />
            case 'moderation':
                return <FaExclamationTriangle className="w-5 h-5 text-yellow-500" />
            default:
                return null
        }
    }

    const handleNotificationClick = (notification: Notification) => {
        if (!notification.isRead) {
            markAsReadMutation.mutate(notification.id)
        }

        if (onClose) {
            onClose()
        }
    }

    return (
        <div className="w-80 max-h-96 overflow-y-auto">
            <div className="p-4 border-b border-stone-200 dark:border-stone-700">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-stone-900 dark:text-stone-100">
                        Уведомления
                    </h3>
                    {notifications.some(n => !n.isRead) && (
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => markAllAsReadMutation.mutate()}
                            loading={markAllAsReadMutation.isPending}
                        >
                            Прочитать все
                        </Button>
                    )}
                </div>
            </div>

            <div className="divide-y divide-stone-200 dark:divide-stone-700">
                {notifications.length === 0 ? (
                    <div className="p-8 text-center">
                        <p className="text-stone-500 dark:text-stone-400">
                            Нет новых уведомлений
                        </p>
                    </div>
                ) : (
                    notifications.map(notification => (
                        <button
                            key={notification.id}
                            onClick={() => handleNotificationClick(notification)}
                            className="w-full p-4 text-left hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
                        >
                            <div className="flex items-start space-x-3">
                                <div className="relative">
                                    <Avatar
                                        src={notification.sourceUserAvatar}
                                        size="sm"
                                        fallback={notification.sourceUserName}
                                    />
                                    <div className="absolute -top-1 -right-1">
                                        {getIcon(notification.type)}
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="font-medium text-stone-900 dark:text-stone-100">
                                                {notification.sourceUserName}
                                            </p>
                                            <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
                                                {notification.message}
                                            </p>
                                        </div>
                                        {!notification.isRead && (
                                            <div className="w-2 h-2 bg-amber-500 rounded-full ml-2" />
                                        )}
                                    </div>

                                    <p className="text-xs text-stone-500 dark:text-stone-500 mt-2">
                                        {formatDate(notification.createdAt)}
                                    </p>
                                </div>
                            </div>
                        </button>
                    ))
                )}
            </div>
        </div>
    )
}
