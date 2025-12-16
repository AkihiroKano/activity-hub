import React, { forwardRef } from 'react'
import { cn } from '../utils/helpers'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
    icon?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, icon, id, ...props }, ref) => {
        const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

        return (
            <div className="space-y-1">
                {label && (
                    <label htmlFor={inputId} className="block text-sm font-medium text-stone-700 dark:text-stone-300">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {icon && (
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400">
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        id={inputId}
                        className={cn(
                            'w-full px-3 py-2 border rounded-lg transition-colors',
                            'bg-white dark:bg-stone-800',
                            'border-stone-300 dark:border-stone-700',
                            'text-stone-900 dark:text-stone-100',
                            'placeholder:text-stone-400 dark:placeholder:text-stone-500',
                            'focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent',
                            icon && 'pl-10',
                            error && 'border-red-500 focus:ring-red-500',
                            className
                        )}
                        {...props}
                    />
                </div>
                {error && (
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                )}
            </div>
        )
    }
)

Input.displayName = 'Input'
