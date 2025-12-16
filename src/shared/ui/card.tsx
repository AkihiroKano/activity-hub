import React from 'react'
import { cn } from '../utils/helpers'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    hover?: boolean
}

export function Card({ className, hover = false, children, ...props }: CardProps) {
    return (
        <div
            className={cn(
                'rounded-xl border',
                'bg-white/80 dark:bg-stone-800/60 backdrop-blur-sm',
                'border-stone-200 dark:border-stone-700',
                'transition-all duration-200',
                hover && 'hover:shadow-lg hover:-translate-y-0.5',
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn('p-6 pb-3', className)} {...props}>
            {children}
        </div>
    )
}

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h3 className={cn('text-xl font-semibold text-stone-900 dark:text-stone-100', className)} {...props}>
            {children}
        </h3>
    )
}

export function CardDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p className={cn('text-sm text-stone-600 dark:text-stone-400', className)} {...props}>
            {children}
        </p>
    )
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn('p-6 pt-3', className)} {...props}>
            {children}
        </div>
    )
}

export function CardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn('p-6 pt-3', className)} {...props}>
            {children}
        </div>
    )
}
