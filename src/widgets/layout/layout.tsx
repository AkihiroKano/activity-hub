import React from 'react'
import { Header } from '@widgets/header/header'
import { Sidebar } from '@widgets/sidebar/sidebar'
import { Footer } from '@widgets/footer/footer'
import { useUIStore } from '@/app/store/ui-store'
import { cn } from '@/shared/utils/helpers'

interface LayoutProps {
    children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
    const { sidebarOpen, mobileSidebarOpen } = useUIStore()

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-50 to-stone-50 dark:from-stone-900 dark:to-stone-800">
            <Header />

            <div className="flex flex-1">
                {/* Desktop Sidebar */}
                <aside className={cn(
                    'hidden lg:block transition-all duration-300 border-r border-stone-200 dark:border-stone-700',
                    sidebarOpen ? 'w-64' : 'w-20'
                )}>
                    <Sidebar />
                </aside>

                {/* Mobile Sidebar Overlay */}
                {mobileSidebarOpen && (
                    <div className="fixed inset-0 z-40 lg:hidden">
                        <div className="absolute inset-0 bg-black/50" />
                        <div className="absolute inset-y-0 left-0 w-64">
                            <Sidebar />
                        </div>
                    </div>
                )}

                {/* Main Content */}
                <main className="flex-1 p-4 lg:p-6 overflow-auto">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>

            <Footer />
        </div>
    )
}