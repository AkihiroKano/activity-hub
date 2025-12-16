import React from 'react'
import { cn } from '../utils/helpers'

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn('animate-pulse bg-stone-200 dark:bg-stone-700 rounded', className)}
            {...props}
        />
    )
}
