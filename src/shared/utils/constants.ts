export const CATEGORY_ICON_COLORS = {
    'ground-travel': '#a16207',    // янтарный
    'water-activities': '#0ea5e9', // голубой
    'air-travel': '#8b5cf6',       // фиолетовый
    'active-leisure': '#10b981',   // зеленый
    'extreme': '#ef4444',          // красный
    'music-creative': '#ec4899',   // розовый
} as const

export const GLOBAL_COLOR_SCHEME = {
    light: {
        background: 'bg-gradient-to-br from-amber-50 to-stone-50',
        card: 'bg-white/80 backdrop-blur-sm',
        accent: {
            primary: 'bg-[#ffc09e] hover:bg-[#ffb08a]',
            secondary: 'bg-amber-100 hover:bg-amber-200',
            text: 'text-amber-800',
            border: 'border-amber-300',
        },
        text: {
            primary: 'text-stone-900',
            secondary: 'text-stone-600',
            muted: 'text-stone-400',
        },
        border: 'border-stone-200',
    },
    dark: {
        background: 'bg-gradient-to-br from-stone-900 to-stone-800',
        card: 'bg-stone-800/60 backdrop-blur-sm',
        accent: {
            primary: 'bg-[#ffc09e] hover:bg-[#ffb08a]',
            secondary: 'bg-amber-900/30 hover:bg-amber-900/50',
            text: 'text-amber-300',
            border: 'border-amber-700',
        },
        text: {
            primary: 'text-stone-100',
            secondary: 'text-stone-300',
            muted: 'text-stone-500',
        },
        border: 'border-stone-700',
    }
} as const

export const MAIN_CATEGORIES = [
    {
        id: 1,
        name: 'Наземные поездки',
        iconKey: 'ground-travel',
        description: 'Авто, мото, вело, походы',
        color: CATEGORY_ICON_COLORS['ground-travel'],
    },
    {
        id: 2,
        name: 'Водные активности',
        iconKey: 'water-activities',
        description: 'Дайвинг, серфинг, яхтинг',
        color: CATEGORY_ICON_COLORS['water-activities'],
    },
    {
        id: 3,
        name: 'Воздушные полеты',
        iconKey: 'air-travel',
        description: 'Парапланы, авиация',
        color: CATEGORY_ICON_COLORS['air-travel'],
    },
    {
        id: 4,
        name: 'Активный отдых',
        iconKey: 'active-leisure',
        description: 'Туризм, спорт, фитнес',
        color: CATEGORY_ICON_COLORS['active-leisure'],
    },
    {
        id: 5,
        name: 'Экстрим',
        iconKey: 'extreme',
        description: 'Экстремальные виды спорта',
        color: CATEGORY_ICON_COLORS['extreme'],
    },
    {
        id: 6,
        name: 'Музыка и творчество',
        iconKey: 'music-creative',
        description: 'Музыка, искусство, DIY',
        color: CATEGORY_ICON_COLORS['music-creative'],
    },
] as const
