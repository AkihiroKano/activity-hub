import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './index.css'

// Определяем, нужно ли включать моки
const shouldEnableMocks =
    import.meta.env.MODE === 'development' ||
    import.meta.env.VITE_USE_MOCKS === 'true'

async function enableMocking() {
    if (!shouldEnableMocks) {
        console.log('Mocks disabled')
        return
    }

    const { worker } = await import('./mocks/browser')

    return worker.start({
        onUnhandledRequest: 'bypass',
        serviceWorker: {
            url: import.meta.env.BASE_URL + 'mockServiceWorker.js',
            options: {
                scope: import.meta.env.BASE_URL,
            },
        },
        quiet: true, // Убираем лишние логи в production
    }).catch((error) => {
        console.warn('MSW failed to start:', error.message)
        console.log('Continuing without mocks...')
    })
}

// Запускаем приложение
const startApp = async () => {
    try {
        await enableMocking()
    } catch (error) {
        console.warn('Failed to start mocks:', error)
    }

    ReactDOM.createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    )
}

startApp()