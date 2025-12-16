import { FaSun, FaMoon } from 'react-icons/fa'
import { useTheme } from '@/app/providers/theme-provider'
import { Button } from '@/shared/ui/button'

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            icon={theme === 'light' ? <FaMoon /> : <FaSun />}
        >
            {theme === 'light' ? 'Темная' : 'Светлая'} тема
        </Button>
    )
}
