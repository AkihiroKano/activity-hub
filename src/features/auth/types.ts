export interface User {
    id: number
    email: string
    username: string
    avatar: string
    bio: string
    createdAt: string
    favoriteSubcategoryIds: number[]
}

export interface AuthResponse {
    user: User
    token: string
}

export interface LoginRequest {
    email: string
    password: string
}

export interface RegisterRequest {
    email: string
    password: string
    username: string
}
