import { create } from 'zustand'

interface UIState {
    sidebarOpen: boolean
    mobileSidebarOpen: boolean
    activeModal: string | null
    notificationsOpen: boolean
    setSidebarOpen: (open: boolean) => void
    setMobileSidebarOpen: (open: boolean) => void
    setActiveModal: (modal: string | null) => void
    setNotificationsOpen: (open: boolean) => void
    toggleSidebar: () => void
    toggleMobileSidebar: () => void
    toggleNotifications: () => void
}

export const useUIStore = create<UIState>((set) => ({
    sidebarOpen: true,
    mobileSidebarOpen: false,
    activeModal: null,
    notificationsOpen: false,

    setSidebarOpen: (open) => set({ sidebarOpen: open }),
    setMobileSidebarOpen: (open) => set({ mobileSidebarOpen: open }),
    setActiveModal: (modal) => set({ activeModal: modal }),
    setNotificationsOpen: (open) => set({ notificationsOpen: open }),

    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    toggleMobileSidebar: () => set((state) => ({ mobileSidebarOpen: !state.mobileSidebarOpen })),
    toggleNotifications: () => set((state) => ({ notificationsOpen: !state.notificationsOpen })),
}))
