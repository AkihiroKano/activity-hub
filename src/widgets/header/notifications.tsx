import { FaBell } from 'react-icons/fa'
import { Dropdown } from '@features/ui/dropdown'
import { NotificationList } from '@features/notifications/components/notification-list'
import { useQuery } from '@tanstack/react-query'
import { notificationsApi } from '@features/notifications/api'
import { useState } from 'react'

export function Notifications() {
    const [isOpen, setIsOpen] = useState(false)

    const { data, refetch } = useQuery({
        queryKey: ['notifications'],
        queryFn: () => notificationsApi.getNotifications({ limit: 10 }),
        enabled: isOpen, // Загружаем только когда открыто
    })

    const unreadCount = data?.unreadCount || 0

    const handleNotificationClick = () => {
        if (isOpen) {
            refetch() // Обновляем при открытии
        }
    }

    return (
        <Dropdown
            trigger={
                <button
                    className="relative p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                    onClick={handleNotificationClick}
                >
                    <FaBell className="w-5 h-5 text-stone-600 dark:text-stone-400" />
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                            {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                    )}
                </button>
            }
            align="right"
            isOpen={isOpen}
            onToggle={setIsOpen}
            onClose={() => setIsOpen(false)}
        >
            <NotificationList
                notifications={data?.notifications || []}
                onClose={() => setIsOpen(false)}
            />
        </Dropdown>
    )
}