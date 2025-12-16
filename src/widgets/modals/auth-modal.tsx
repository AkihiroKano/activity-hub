import { useState } from 'react'
import { Modal } from '@/shared/ui/modal'
import { Button } from '@/shared/ui/button'
import { LoginForm } from '@pages/auth/login'
import { RegisterForm } from '@pages/auth/register'

interface AuthModalProps {
    isOpen: boolean
    onClose: () => void
    initialMode?: 'login' | 'register'
}

export function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
    const [mode, setMode] = useState<'login' | 'register'>(initialMode)

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={mode === 'login' ? 'Вход в аккаунт' : 'Регистрация'}
            size="md"
        >
            <div className="space-y-4">
                {mode === 'login' ? (
                    <LoginForm onSuccess={onClose} />
                ) : (
                    <RegisterForm onSuccess={onClose} />
                )}

                <div className="pt-4 border-t border-stone-200 dark:border-stone-700">
                    <p className="text-center text-sm text-stone-600 dark:text-stone-400">
                        {mode === 'login' ? 'Еще нет аккаунта?' : 'Уже есть аккаунт?'}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                            className="ml-2"
                        >
                            {mode === 'login' ? 'Зарегистрироваться' : 'Войти'}
                        </Button>
                    </p>
                </div>
            </div>
        </Modal>
    )
}
