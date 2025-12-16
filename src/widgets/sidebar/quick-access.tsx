import { FaStar, FaEdit, FaTimes, FaPlus } from 'react-icons/fa'
import { Button } from '@/shared/ui/button'
import { useAuth } from '@/app/providers/auth-provider'

interface QuickAccessItem {
    id: number
    name: string
    subcategory?: string
    icon?: string
}

interface QuickAccessProps {
    isCollapsed: boolean
    items?: QuickAccessItem[]
    onEdit?: () => void
    onAdd?: () => void
    onRemove?: (id: number) => void
}

export function QuickAccess({
    isCollapsed,
    items = [],
    onEdit,
    onAdd,
    onRemove,
}: QuickAccessProps) {
    const { user } = useAuth()

    if (!user) return null

    const defaultItems: QuickAccessItem[] = [
        { id: 1, name: 'Мототуры', subcategory: 'Наземные поездки', icon: '🏍️' },
        { id: 2, name: 'Дайвинг', subcategory: 'Водные активности', icon: '🤿' },
        { id: 3, name: 'Велоспорт', subcategory: 'Активный отдых', icon: '🚴' },
        { id: 4, name: 'Фотография', subcategory: 'Творчество', icon: '📸' },
    ]

    const displayItems = items.length > 0 ? items.slice(0, 5) : defaultItems.slice(0, 5)

    if (isCollapsed) {
        return (
            <div className="pt-4 border-t border-stone-200 dark:border-stone-700">
                <div className="flex justify-center">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onAdd}
                        className="p-2"
                        title="Быстрый доступ"
                    >
                        <FaStar className="w-5 h-5 text-amber-500" />
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="pt-4 border-t border-stone-200 dark:border-stone-700">
            <div className="flex items-center justify-between px-3 mb-2">
                <div className="flex items-center space-x-2">
                    <FaStar className="w-4 h-4 text-amber-500" />
                    <h3 className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                        Быстрый доступ
                    </h3>
                </div>
                <div className="flex items-center space-x-1">
                    <button
                        onClick={onEdit}
                        className="p-1 hover:bg-stone-100 dark:hover:bg-stone-800 rounded transition-colors"
                        title="Редактировать"
                    >
                        <FaEdit className="w-3 h-3 text-stone-400" />
                    </button>
                    <button
                        onClick={onAdd}
                        className="p-1 hover:bg-stone-100 dark:hover:bg-stone-800 rounded transition-colors"
                        title="Добавить"
                    >
                        <FaPlus className="w-3 h-3 text-stone-400" />
                    </button>
                </div>
            </div>

            <nav className="space-y-1">
                {displayItems.map((item) => (
                    <div
                        key={item.id}
                        className="group flex items-center justify-between px-3 py-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                    >
                        <div className="flex items-center space-x-3 min-w-0 flex-1">
                            {item.icon && (
                                <span className="text-lg flex-shrink-0">{item.icon}</span>
                            )}
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-stone-900 dark:text-stone-100 truncate">
                                    {item.name}
                                </p>
                                {item.subcategory && (
                                    <p className="text-xs text-stone-500 dark:text-stone-500 truncate">
                                        {item.subcategory}
                                    </p>
                                )}
                            </div>
                        </div>

                        {onRemove && (
                            <button
                                onClick={() => onRemove(item.id)}
                                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-stone-200 dark:hover:bg-stone-700 rounded transition-all"
                                title="Удалить"
                            >
                                <FaTimes className="w-3 h-3 text-stone-400 hover:text-red-500" />
                            </button>
                        )}
                    </div>
                ))}
            </nav>

            {displayItems.length === 0 && (
                <div className="px-3 py-4 text-center">
                    <p className="text-sm text-stone-500 dark:text-stone-400 mb-2">
                        Добавьте категории в быстрый доступ
                    </p>
                    <Button size="sm" onClick={onAdd} variant="outline">
                        <FaPlus className="mr-2" />
                        Добавить
                    </Button>
                </div>
            )}
        </div>
    )
}
