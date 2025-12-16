import { setupWorker } from 'msw/browser'
import { handlers } from '../../mocks/handlers'

export const worker = setupWorker(...handlers)

// Функция для сброса моков к начальному состоянию
export function resetMocks() {
    localStorage.removeItem('activityhub-mocks')
    window.location.reload()
}
