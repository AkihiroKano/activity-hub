import { FaBars, FaPlus } from 'react-icons/fa'
import { useUIStore } from '@/app/store/ui-store'
import { useAuth } from '@/app/providers/auth-provider'
import { UserMenu } from '@widgets/header/user-menu'
import { Notifications } from '@widgets/header/notifications'
import { Button } from '@/shared/ui/button'
import { ThemeToggle } from '@features/ui/theme-toggle'

export function Header() {
    const { setMobileSidebarOpen, setActiveModal } = useUIStore()
    const { user } = useAuth()

    const handleCreatePost = () => {
        setActiveModal('create-post')
    }

    return (
        <header className="sticky top-0 z-30 border-b border-stone-200 dark:border-stone-700 bg-white/80 dark:bg-stone-800/60 backdrop-blur-sm">
            <div className="flex items-center justify-between px-4 lg:px-6 py-3">
                {/* Left side */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setMobileSidebarOpen(true)}
                        className="lg:hidden p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                    >
                        <FaBars className="w-5 h-5 text-stone-600 dark:text-stone-400" />
                    </button>

                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#ffc09e] to-amber-300 rounded-lg" />
                        <h1 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                            ActivityHub
                        </h1>
                    </div>
                </div>

                {/* Center - Search */}
                <div className="flex-1 max-w-2xl mx-4 hidden md:block">
                    <div className="relative">
                        <input
                            type="search"
                            placeholder="Поиск активностей, пользователей, тегов..."
                            className="w-full px-4 py-2 pl-10 rounded-full border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder:text-stone-500 dark:placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400">
                            🔍
                        </div>
                    </div>
                </div>

                {/* Right side */}
                <div className="flex items-center space-x-2">
                    <ThemeToggle />

                    {user ? (
                        <>
                            <Button
                                onClick={handleCreatePost}
                                icon={<FaPlus />}
                                className="hidden sm:flex"
                            >
                                Создать пост
                            </Button>

                            <Notifications />
                            <UserMenu />
                        </>
                    ) : (
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                onClick={() => window.location.href = '/login'}
                            >
                                Войти
                            </Button>
                            <Button
                                onClick={() => window.location.href = '/register'}
                            >
                                Регистрация
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile search */}
            <div className="md:hidden px-4 pb-3">
                <div className="relative">
                    <input
                        type="search"
                        placeholder="Поиск..."
                        className="w-full px-4 py-2 pl-10 rounded-full border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder:text-stone-500 dark:placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400">
                        🔍
                    </div>
                </div>
            </div>
        </header>
    )
}
