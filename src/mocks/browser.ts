import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

// Создаем worker только если в браузере
export const worker = setupWorker(...handlers)

// Экспортируем функцию для ручного запуска
export async function startMocks() {
    if (typeof window === 'undefined') return

    return worker.start({
        onUnhandledRequest: 'bypass',
        serviceWorker: {
            url: '/mockServiceWorker.js',
        },
    })
}