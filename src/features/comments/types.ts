export interface Comment {
    id: number
    content: string
    authorId: number
    postId: number
    parentId: number | null
    replies: Comment[]
    likesCount: number
    createdAt: string
}

export interface CreateCommentRequest {
    content: string
    postId: number
    parentId?: number | null
}
