import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../utils/helpers'
import { FaTimes } from 'react-icons/fa'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    children: React.ReactNode
    size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
    }

    const modalContent = (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            <div
                className={cn(
                    'relative z-10 w-full rounded-xl',
                    'bg-white dark:bg-stone-800',
                    'border border-stone-200 dark:border-stone-700',
                    'shadow-2xl',
                    sizeClasses[size]
                )}
                onClick={e => e.stopPropagation()}
            >
                {title && (
                    <div className="flex items-center justify-between p-6 pb-3 border-b border-stone-200 dark:border-stone-700">
                        <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-100">
                            {title}
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-1 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors"
                        >
                            <FaTimes className="w-5 h-5 text-stone-500" />
                        </button>
                    </div>
                )}

                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    )

    return createPortal(modalContent, document.body)
}
