import { useState } from 'react'
import { FaSave, FaKey, FaBell, FaGlobe, FaShieldAlt } from 'react-icons/fa'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { ThemeToggle } from '@features/ui/theme-toggle'

export function SettingsPage() {
    const [notifications, setNotifications] = useState({
        likes: true,
        comments: true,
        follows: true,
        mentions: true,
    })

    const handleSave = () => {
        // Сохранение настроек
        console.log('Settings saved')
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
                Настройки
            </h1>

            {/* Account Settings */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <FaKey className="w-5 h-5 mr-2 text-stone-500" />
                        Настройки аккаунта
                    </CardTitle>
                    <CardDescription>
                        Управление настройками безопасности и доступом
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-4">
                        <Input
                            label="Текущий пароль"
                            type="password"
                            placeholder="••••••••"
                        />
                        <Input
                            label="Новый пароль"
                            type="password"
                            placeholder="••••••••"
                        />
                        <Input
                            label="Подтверждение нового пароля"
                            type="password"
                            placeholder="••••••••"
                        />
                        <Button>
                            <FaSave className="mr-2" />
                            Изменить пароль
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <FaBell className="w-5 h-5 mr-2 text-stone-500" />
                        Уведомления
                    </CardTitle>
                    <CardDescription>
                        Настройте получение уведомлений
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {Object.entries(notifications).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-stone-900 dark:text-stone-100 capitalize">
                                    {key === 'likes' && 'Лайки'}
                                    {key === 'comments' && 'Комментарии'}
                                    {key === 'follows' && 'Подписки'}
                                    {key === 'mentions' && 'Упоминания'}
                                </p>
                                <p className="text-sm text-stone-600 dark:text-stone-400">
                                    {key === 'likes' && 'Уведомления о лайках'}
                                    {key === 'comments' && 'Уведомления о новых комментариях'}
                                    {key === 'follows' && 'Уведомления о новых подписчиках'}
                                    {key === 'mentions' && 'Уведомления об упоминаниях'}
                                </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={value}
                                    onChange={(e) =>
                                        setNotifications(prev => ({ ...prev, [key]: e.target.checked }))
                                    }
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none peer-focus:ring-amber-500 rounded-full peer dark:bg-stone-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                            </label>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Appearance */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <FaGlobe className="w-5 h-5 mr-2 text-stone-500" />
                        Внешний вид
                    </CardTitle>
                    <CardDescription>
                        Настройте внешний вид приложения
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-stone-900 dark:text-stone-100">
                                Тема оформления
                            </p>
                            <p className="text-sm text-stone-600 dark:text-stone-400">
                                Выберите светлую или темную тему
                            </p>
                        </div>
                        <ThemeToggle />
                    </div>
                </CardContent>
            </Card>

            {/* Privacy */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <FaShieldAlt className="w-5 h-5 mr-2 text-stone-500" />
                        Конфиденциальность
                    </CardTitle>
                    <CardDescription>
                        Управление настройками приватности
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-stone-900 dark:text-stone-100">
                                Профиль открыт для всех
                            </p>
                            <p className="text-sm text-stone-600 dark:text-stone-400">
                                Любой пользователь может видеть ваш профиль
                            </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none peer-focus:ring-amber-500 rounded-full peer dark:bg-stone-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-stone-900 dark:text-stone-100">
                                Разрешить сообщения
                            </p>
                            <p className="text-sm text-stone-600 dark:text-stone-400">
                                Любой пользователь может отправить вам сообщение
                            </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none peer-focus:ring-amber-500 rounded-full peer dark:bg-stone-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                        </label>
                    </div>
                </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-red-200 dark:border-red-900/50">
                <CardHeader>
                    <CardTitle className="text-red-600 dark:text-red-400">
                        Опасная зона
                    </CardTitle>
                    <CardDescription className="text-red-600/80 dark:text-red-400/80">
                        Эти действия нельзя отменить
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-stone-900 dark:text-stone-100">
                                Удалить аккаунт
                            </p>
                            <p className="text-sm text-stone-600 dark:text-stone-400">
                                Навсегда удалить аккаунт и все данные
                            </p>
                        </div>
                        <Button variant="danger">
                            Удалить аккаунт
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button onClick={handleSave} size="lg">
                    <FaSave className="mr-2" />
                    Сохранить все настройки
                </Button>
            </div>
        </div>
    )
}

export default SettingsPage
