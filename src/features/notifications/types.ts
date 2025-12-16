export type NotificationType = 'like' | 'comment' | 'follow' | 'mention' | 'moderation'

export interface Notification {
    id: number
    type: NotificationType
    userId: number
    sourceUserId: number
    sourceUserName: string
    sourceUserAvatar: string
    postId?: number
    commentId?: number
    subcategoryId?: number
    message: string
    isRead: boolean
    createdAt: string
}
