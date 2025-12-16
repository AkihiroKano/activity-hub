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
    isOpen?: boolean
    onToggle?: (open: boolean) => void
}

export function Dropdown({
    trigger,
    children,
    align = 'left',
    className,
    onClose,
    isOpen: controlledIsOpen,
    onToggle
}: DropdownProps) {
    const [internalIsOpen, setInternalIsOpen] = useState(false)
    const [position, setPosition] = useState({ top: 0, left: 0, width: 0 })
    const triggerRef = useRef<HTMLDivElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const isControlled = controlledIsOpen !== undefined
    const isOpen = isControlled ? controlledIsOpen : internalIsOpen

    const setIsOpen = (value: boolean) => {
        if (!isControlled) {
            setInternalIsOpen(value)
        }
        onToggle?.(value)
        if (!value) {
            onClose?.()
        }
    }

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false)
                onClose?.()
            }
        }

        document.addEventListener('keydown', handleEscape)

        return () => {
            document.removeEventListener('keydown', handleEscape)
        }
    }, [isOpen, onClose])

    useClickOutside([triggerRef, dropdownRef], () => {
        if (isOpen) {
            setIsOpen(false)
            onClose?.()
        }
    })

    const handleTriggerClick = () => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect()
            setPosition({
                top: rect.bottom + window.scrollY + 4,
                left: rect.left + window.scrollX,
                width: rect.width
            })
        }
        setIsOpen(!isOpen)
    }

    const dropdownContent = isOpen ? (
        <div
            ref={dropdownRef}
            className={cn(
                'fixed z-50 mt-1 rounded-lg border shadow-lg',
                'bg-white dark:bg-stone-800',
                'border-stone-200 dark:border-stone-700',
                'animate-in fade-in-0 zoom-in-95',
                'min-w-[200px]',
                className
            )}
            style={{
                top: position.top,
                left: align === 'left' ? position.left : 'auto',
                right: align === 'right' ? window.innerWidth - position.left - position.width : 'auto',
            }}
        >
            {children}
        </div>
    ) : null

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