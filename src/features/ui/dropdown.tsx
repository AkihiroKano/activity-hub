import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/shared/utils/helpers'
import { useClickOutside } from '@/shared/hooks/use-click-outside'

interface DropdownProps {
    trigger: React.ReactNode
    children: React.ReactNode
    align?: 'left' | 'right'
    className?: string
    onClose?: () => void
}

export function Dropdown({ trigger, children, align = 'left', className, onClose }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [position, setPosition] = useState({ top: 0, left: 0 })
    const triggerRef = useRef<HTMLDivElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsOpen(false)
                onClose?.()
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscape)

            if (triggerRef.current) {
                const rect = triggerRef.current.getBoundingClientRect()
                setPosition({
                    top: rect.bottom + window.scrollY,
                    left: align === 'left' ? rect.left + window.scrollX : rect.right + window.scrollX,
                })
            }
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
        }
    }, [isOpen, align, onClose])

    useClickOutside(dropdownRef, () => {
        setIsOpen(false)
        onClose?.()
    })

    const handleTriggerClick = () => {
        setIsOpen(!isOpen)
    }

    const dropdownContent = (
        <div
            ref={dropdownRef}
            className={cn(
                'fixed z-50 mt-1 min-w-[200px] rounded-lg border shadow-lg',
                'bg-white dark:bg-stone-800',
                'border-stone-200 dark:border-stone-700',
                'animate-in',
                className
            )}
            style={{
                top: position.top,
                left: align === 'left' ? position.left : 'auto',
                right: align === 'right' ? window.innerWidth - position.left : 'auto',
            }}
        >
            {children}
        </div>
    )

    return (
        <>
            <div ref={triggerRef} onClick={handleTriggerClick} className="inline-block">
                {trigger}
            </div>

            {isOpen && createPortal(dropdownContent, document.body)}
        </>
    )
}

export function DropdownItem({
    children,
    onClick,
    className,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            className={cn(
                'w-full px-4 py-2 text-left text-sm transition-colors',
                'hover:bg-stone-100 dark:hover:bg-stone-700',
                'text-stone-700 dark:text-stone-300',
                className
            )}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    )
}
