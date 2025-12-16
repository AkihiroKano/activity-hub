export interface User {
    id: number
    email: string
    username: string
    avatar: string
    bio: string
    createdAt: string
    favoriteSubcategoryIds: number[]
}

export interface UserStats {
    postsCount: number
    followersCount: number
    followingCount: number
    likesCount: number
}