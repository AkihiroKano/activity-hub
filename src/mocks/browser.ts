import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)

export async function startMocks() {
    if (typeof window === 'undefined') return

    // Регистрируем service worker
    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register(
                import.meta.env.BASE_URL + 'mockServiceWorker.js',
                {
                    scope: import.meta.env.BASE_URL,
                }
            )
        } catch (error) {
            console.warn('Service worker registration failed:', error)
        }
    }

    return worker.start({
        onUnhandledRequest: 'bypass',
        serviceWorker: {
            url: import.meta.env.BASE_URL + 'mockServiceWorker.js',
            options: {
                scope: import.meta.env.BASE_URL,
            },
        },
        quiet: import.meta.env.PROD,
    })
}