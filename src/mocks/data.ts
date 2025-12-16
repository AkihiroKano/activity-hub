import { MAIN_CATEGORIES } from '@/shared/utils/constants'

export const mockData = {
    users: [
        {
            id: 1,
            email: 'user@example.com',
            password: 'password123',
            username: 'Мото_Путешественник',
            avatar: '',
            bio: 'Любитель мототуров и горных дорог. Проехал более 50,000 км по России и Европе.',
            createdAt: '2024-01-01T10:00:00Z',
            favoriteSubcategoryIds: [1, 3],
        },
        {
            id: 2,
            email: 'diver@example.com',
            password: 'password123',
            username: 'Дайвер_Про',
            avatar: '',
            bio: 'Профессиональный дайвер с 10-летним опытом. Люблю исследовать коралловые рифы.',
            createdAt: '2024-01-02T14:30:00Z',
            favoriteSubcategoryIds: [2],
        },
        {
            id: 3,
            email: 'cyclist@example.com',
            password: 'password123',
            username: 'Вело_Путешественник',
            avatar: '',
            bio: 'Велотуризм - моя страсть. Проехал Крым, Кавказ и Альпы.',
            createdAt: '2024-01-03T09:15:00Z',
            favoriteSubcategoryIds: [1],
        },
    ],

    mainCategories: MAIN_CATEGORIES,

    subcategories: [
        {
            id: 1,
            name: 'Мототуры',
            description: 'Путешествия на мотоциклах',
            mainCategoryId: 1,
            createdByUserId: 1,
            isApproved: true,
            moderators: [1],
            tags: ['мото', 'путешествия', 'горы', 'дороги'],
            createdAt: '2024-01-01T10:00:00Z',
        },
        {
            id: 2,
            name: 'Дайвинг',
            description: 'Подводное плавание',
            mainCategoryId: 2,
            createdByUserId: 2,
            isApproved: true,
            moderators: [2],
            tags: ['дайвинг', 'подводный мир', 'кораллы', 'акулы'],
            createdAt: '2024-01-02T14:30:00Z',
        },
        {
            id: 3,
            name: 'Автопутешествия',
            description: 'Поездки на автомобилях',
            mainCategoryId: 1,
            createdByUserId: 1,
            isApproved: true,
            moderators: [1],
            tags: ['авто', 'путешествия', 'кемпинг'],
            createdAt: '2024-01-03T09:15:00Z',
        },
        {
            id: 4,
            name: 'Серфинг',
            description: 'Катание на волнах',
            mainCategoryId: 2,
            createdByUserId: 2,
            isApproved: false,
            moderators: [],
            tags: ['серфинг', 'океан', 'волны'],
            createdAt: '2024-01-04T16:45:00Z',
        },
        {
            id: 5,
            name: 'Парапланеризм',
            description: 'Полеты на парапланах',
            mainCategoryId: 3,
            createdByUserId: 1,
            isApproved: true,
            moderators: [1],
            tags: ['параплан', 'полеты', 'небо'],
            createdAt: '2024-01-05T11:20:00Z',
        },
        {
            id: 6,
            name: 'Альпинизм',
            description: 'Восхождения на горы',
            mainCategoryId: 4,
            createdByUserId: 2,
            isApproved: true,
            moderators: [2],
            tags: ['альпинизм', 'горы', 'восхождения'],
            createdAt: '2024-01-06T13:45:00Z',
        },
        {
            id: 7,
            name: 'Музыкальные фестивали',
            description: 'Посещение музыкальных событий',
            mainCategoryId: 6,
            createdByUserId: 3,
            isApproved: true,
            moderators: [3],
            tags: ['музыка', 'фестивали', 'концерты'],
            createdAt: '2024-01-07T15:30:00Z',
        },
    ],

    posts: [
        {
            id: 1,
            title: 'Незабываемый мототур по Кавказским горам: 7 дней чистого адреналина',
            content: 'Это было самое невероятное путешествие в моей жизни! Мы с друзьями организовали недельный тур по самым живописным местам Кавказа...',
            authorId: 1,
            subcategoryId: 1,
            tags: ['мото', 'горы', 'кавказ', 'путешествие', 'адреналин'],
            media: {
                photos: [
                    'https://images.unsplash.com/photo-1558980664-1db506751c6c?w=800&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop',
                ],
                route: {
                    points: [
                        { lat: 43.0406, lng: 44.6778 },
                        { lat: 42.661, lng: 44.642 },
                    ],
                    distance: 350,
                    duration: 420,
                },
            },
            location: {
                lat: 43.0406,
                lng: 44.6778,
                name: 'Владикавказ, Россия',
            },
            likesCount: 245,
            commentsCount: 42,
            createdAt: '2024-01-15T10:30:00Z',
            updatedAt: '2024-01-15T10:30:00Z',
        },
        {
            id: 2,
            title: 'Первый опыт дайвинга на Мальдивах',
            content: 'Невероятные впечатления от первого погружения! Кристально чистая вода, разноцветные кораллы и тысячи рыб...',
            authorId: 2,
            subcategoryId: 2,
            tags: ['дайвинг', 'мальдивы', 'первый опыт', 'кораллы'],
            media: {
                photos: [
                    'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&auto=format&fit=crop',
                ],
            },
            location: {
                lat: 4.1755,
                lng: 73.5093,
                name: 'Мальдивы',
            },
            likesCount: 189,
            commentsCount: 31,
            createdAt: '2024-01-14T14:20:00Z',
            updatedAt: '2024-01-14T14:20:00Z',
        },
        {
            id: 3,
            title: 'Велопоход по Крыму: 300 км за 5 дней',
            content: 'Проехали от Севастополя до Керчи вдоль побережья. Сложный маршрут с подъемами и спусками, но невероятные виды на море и горы. Ночуяли в палатках на берегу. Незабываемый опыт!',
            authorId: 3,
            subcategoryId: 1,
            tags: ['вело', 'крым', 'поход', 'палатка'],
            media: {
                photos: [
                    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop',
                ],
            },
            location: {
                lat: 44.9521,
                lng: 34.1024,
                name: 'Крым',
            },
            likesCount: 203,
            commentsCount: 31,
            createdAt: '2024-01-08T11:45:00Z',
            updatedAt: '2024-01-08T11:45:00Z',
        },
        {
            id: 4,
            title: 'Мототур по Кавказу: незабываемые впечатления',
            content: 'Провели неделю в горах Кавказа на мотоциклах. Маршрут включал самые живописные дороги с панорамными видами. Погода была идеальной, дороги - сложными, но проходимыми. Рекомендую всем любителям адреналина и красивых пейзажей!',
            authorId: 1,
            subcategoryId: 1,
            tags: ['мото', 'горы', 'кавказ', 'путешествие', 'адреналин'],
            media: {
                photos: [
                    'https://images.unsplash.com/photo-1558980664-1db506751c6c?w=800&auto=format&fit=crop',
                ],
            },
            location: {
                lat: 43.0406,
                lng: 44.6778,
                name: 'Кавказские горы',
            },
            likesCount: 156,
            commentsCount: 24,
            createdAt: '2024-01-10T08:15:00Z',
            updatedAt: '2024-01-10T08:15:00Z',
        },
    ],

    comments: [
        {
            id: 1,
            content: 'Отличный маршрут! Сам планирую поехать в этом году. Сколько по времени занял подъем к Казбеку?',
            authorId: 2,
            postId: 1,
            parentId: null,
            likesCount: 12,
            createdAt: '2024-01-15T11:45:00Z',
        },
        {
            id: 2,
            content: 'Около 4 часов с остановками на фото. Дорога местами сложная, но проходимая для любого мотоцикла.',
            authorId: 1,
            postId: 1,
            parentId: 1,
            likesCount: 5,
            createdAt: '2024-01-15T12:30:00Z',
        },
        {
            id: 3,
            content: 'Красивые фото! Особенно понравился вид с перевала. Какая была погода?',
            authorId: 2,
            postId: 1,
            parentId: null,
            likesCount: 8,
            createdAt: '2024-01-15T13:20:00Z',
        },
    ],

    notifications: [
        {
            id: 1,
            type: 'like' as const,
            userId: 1,
            sourceUserId: 2,
            sourceUserName: 'Дайвер_Про',
            sourceUserAvatar: '',
            postId: 1,
            message: 'оценил ваш пост о мототуре по Кавказу',
            isRead: false,
            createdAt: '2024-01-15T11:00:00Z',
        },
        {
            id: 2,
            type: 'comment' as const,
            userId: 1,
            sourceUserId: 2,
            sourceUserName: 'Дайвер_Про',
            sourceUserAvatar: '',
            postId: 1,
            commentId: 1,
            message: 'прокомментировал ваш пост',
            isRead: true,
            createdAt: '2024-01-15T11:45:00Z',
        },
        {
            id: 3,
            type: 'follow' as const,
            userId: 1,
            sourceUserId: 2,
            sourceUserName: 'Дайвер_Про',
            sourceUserAvatar: '',
            message: 'подписался на вас',
            isRead: false,
            createdAt: '2024-01-14T09:30:00Z',
        },
    ],

    searchHistory: [
        'мото горы',
        'дайвинг красное море',
        'велопоход крым',
        'альпинизм кавказ',
    ],

    popularTags: [
        { tag: 'мото', count: 1245 },
        { tag: 'дайвинг', count: 876 },
        { tag: 'путешествия', count: 2103 },
        { tag: 'горы', count: 987 },
        { tag: 'пляж', count: 654 },
        { tag: 'экстрим', count: 432 },
    ],

    userStats: [
        { id: 1, username: 'Мото_Эксперт', posts: 42 },
        { id: 2, username: 'Дайвер_Про', posts: 28 },
        { id: 3, username: 'Вело_Путешественник', posts: 35 },
    ],
}

// Save to localStorage on load
if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('activityhub-mocks')
    if (saved) {
        try {
            Object.assign(mockData, JSON.parse(saved))
        } catch (e) {
            console.error('Failed to load saved mocks:', e)
        }
    }

    // Auto-save on changes
    const originalPush = Array.prototype.push
    Array.prototype.push = function (...items) {
        const result = originalPush.apply(this, items)
        try {
            localStorage.setItem('activityhub-mocks', JSON.stringify(mockData))
        } catch (e) {
            console.error('Failed to save mocks:', e)
        }
        return result
    }
}

export default mockData