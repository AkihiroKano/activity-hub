import { FaGithub, FaTelegram, FaVk, FaYoutube } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="border-t border-stone-200 dark:border-stone-700 bg-white/80 dark:bg-stone-800/60 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo and description */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-[#ffc09e] to-amber-300 rounded-lg" />
                            <span className="text-xl font-bold text-stone-900 dark:text-stone-100">
                                ActivityHub
                            </span>
                        </Link>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-4">
                            О проекте
                        </h3>
                        <ul className="space-y-2">
                            {['Правила', 'Помощь', 'Контакты', 'Реклама'].map((item) => (
                                <li key={item}>
                                    <Link
                                        to={`/${item.toLowerCase().replace(' ', '-')}`}
                                        className="text-sm text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                                    >
                                        {item}
                                    </Link>
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
                                { name: 'Наземные поездки', tag: 'ground-travel' },
                                { name: 'Водные активности', tag: 'water-activities' },
                                { name: 'Воздушные полеты', tag: 'air-travel' },
                                { name: 'Активный отдых', tag: 'active-leisure' },
                                { name: 'Экстрим', tag: 'extreme' },
                                { name: 'Музыка и творчество', tag: 'music-creative' },
                            ].map((category) => (
                                <li key={category.name}>
                                    <Link
                                        to={`/categories?tag=${category.tag}`}
                                        className="text-sm text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                                    >
                                        {category.name}
                                    </Link>
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
                                { icon: FaGithub, label: 'GitHub', url: 'https://github.com' },
                                { icon: FaTelegram, label: 'Telegram', url: 'https://telegram.org' },
                                { icon: FaVk, label: 'VK', url: 'https://vk.com' },
                                { icon: FaYoutube, label: 'YouTube', url: 'https://youtube.com' },
                            ].map(({ icon: Icon, label, url }) => (
                                <a
                                    key={label}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
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