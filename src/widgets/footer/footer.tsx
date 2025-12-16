import { FaGithub, FaTelegram, FaVk, FaYoutube } from 'react-icons/fa'

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="border-t border-stone-200 dark:border-stone-700 bg-white/80 dark:bg-stone-800/60 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo and description */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-[#ffc09e] to-amber-300 rounded-lg" />
                            <span className="text-xl font-bold text-stone-900 dark:text-stone-100">
                                ActivityHub
                            </span>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-4">
                            О проекте
                        </h3>
                        <ul className="space-y-2">
                            {['Правила', 'Помощь', 'Контакты', 'Реклама'].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="text-sm text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-4">
                            Категории
                        </h3>
                        <ul className="space-y-2">
                            {[
                                'Наземные поездки',
                                'Водные активности',
                                'Воздушные полеты',
                                'Активный отдых',
                                'Экстрим',
                                'Музыка и творчество',
                            ].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="text-sm text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-4">
                            Социальные сети
                        </h3>
                        <div className="flex space-x-4">
                            {[
                                { icon: FaGithub, label: 'GitHub' },
                                { icon: FaTelegram, label: 'Telegram' },
                                { icon: FaVk, label: 'VK' },
                                { icon: FaYoutube, label: 'YouTube' },
                            ].map(({ icon: Icon, label }) => (
                                <a
                                    key={label}
                                    href="#"
                                    className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
                                    aria-label={label}
                                >
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-8 border-t border-stone-200 dark:border-stone-700 text-center">
                    <p className="text-sm text-stone-600 dark:text-stone-400">
                        © {currentYear} ActivityHub
                    </p>
                </div>
            </div>
        </footer>
    )
}
