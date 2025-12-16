import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useUIStore } from '@/app/store/ui-store'
import { cn } from '@/shared/utils/helpers'
import { Button } from '@/shared/ui/button'
import { Navigation } from '@widgets/sidebar/navigation'
import { QuickAccess } from '@widgets/sidebar/quick-access'

export function Sidebar() {
    const { sidebarOpen, toggleSidebar, setMobileSidebarOpen } = useUIStore()

    const handleNavClick = () => {
        setMobileSidebarOpen(false)
    }

    return (
        <div className="h-full flex flex-col bg-white/80 dark:bg-stone-800/60 backdrop-blur-sm">
            {/* Logo */}
            <div className={cn(
                'p-4 border-b border-stone-200 dark:border-stone-700',
                !sidebarOpen && 'flex justify-center'
            )}>
                <a
                    href="/"
                    className={cn(
                        'flex items-center space-x-3',
                        !sidebarOpen && 'justify-center'
                    )}
                    onClick={handleNavClick}
                >
                    <div className="w-8 h-8 bg-gradient-to-br from-[#ffc09e] to-amber-300 rounded-lg" />
                    {sidebarOpen && (
                        <span className="text-xl font-bold text-stone-900 dark:text-stone-100">
                            ActivityHub
                        </span>
                    )}
                </a>
            </div>

            {/* Main Navigation */}
            <div className="flex-1 p-4 overflow-y-auto">
                <Navigation
                    isCollapsed={!sidebarOpen}
                    onItemClick={handleNavClick}
                />
            </div>

            {/* Quick Access */}
            <QuickAccess
                isCollapsed={!sidebarOpen}
                onEdit={() => console.log('Edit quick access')}
                onAdd={() => console.log('Add to quick access')}
                onRemove={(id) => console.log('Remove from quick access:', id)}
            />

            {/* Toggle Button (Desktop only) */}
            <div className="hidden lg:block p-4 border-t border-stone-200 dark:border-stone-700">
                <Button
                    variant="ghost"
                    onClick={toggleSidebar}
                    className="w-full justify-center"
                    icon={sidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
                >
                    {sidebarOpen && 'Свернуть'}
                </Button>
            </div>
        </div>
    )
}