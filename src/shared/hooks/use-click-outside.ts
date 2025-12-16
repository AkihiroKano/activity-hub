import { useEffect, RefObject } from 'react'

export function useClickOutside<T extends HTMLElement = HTMLElement>(
    refs: RefObject<T | null> | RefObject<T | null>[],
    handler: (event: MouseEvent | TouchEvent) => void
) {
    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            const refsArray = Array.isArray(refs) ? refs : [refs]

            // Проверяем, что клик был вне всех переданных элементов
            const isClickOutside = refsArray.every(ref => {
                const el = ref?.current
                return !el || !el.contains(event.target as Node)
            })

            if (isClickOutside) {
                handler(event)
            }
        }

        document.addEventListener('mousedown', listener)
        document.addEventListener('touchstart', listener)

        return () => {
            document.removeEventListener('mousedown', listener)
            document.removeEventListener('touchstart', listener)
        }
    }, [refs, handler])
}