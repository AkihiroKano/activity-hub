import React from 'react'
import { cn } from '../utils/helpers'
import { FaUser } from 'react-icons/fa'

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    src?: string | null
    alt?: string
    size?: 'sm' | 'md' | 'lg' | 'xl'
    fallback?: string
}

export function Avatar({
    src,
    alt = 'Avatar',
    size = 'md',
    fallback,
    className,
    ...props
}: AvatarProps) {
    const sizes = {
        sm: 'w-8 h-8 text-xs',
        md: 'w-10 h-10 text-sm',
        lg: 'w-12 h-12 text-base',
        xl: 'w-16 h-16 text-lg',
    }

    const renderContent = () => {
        if (src) {
            return (
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover rounded-full"
                />
            )
        }

        if (fallback) {
            return (
                <span className="font-semibold text-amber-800 dark:text-amber-200">
                    {fallback.slice(0, 2).toUpperCase()}
                </span>
            )
        }

        return <FaUser className="w-1/2 h-1/2 text-stone-400" />
    }

    return (
        <div
            className={cn(
                'rounded-full flex items-center justify-center',
                'bg-amber-100 dark:bg-amber-900/30',
                sizes[size],
                className
            )}
            {...props}
        >
            {renderContent()}
        </div>
    )
}
