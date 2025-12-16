import { http, HttpResponse } from 'msw'
import mockData from './data'

let data = { ...mockData }

export const handlers = [
    // Auth
    http.post('/api/auth/login', async ({ request }) => {
        const { email, password } = (await request.json()) as any

        const user = data.users.find(u => u.email === email && u.password === password)
        if (!user) {
            return HttpResponse.json({ message: 'Invalid credentials' }, { status: 401 })
        }

        const { password: _, ...userWithoutPassword } = user
        const token = btoa(`${user.id}:${Date.now()}`)

        return HttpResponse.json({
            user: userWithoutPassword,
            token,
        })
    }),

    http.post('/api/auth/register', async ({ request }) => {
        const { email, password, username } = (await request.json()) as any

        if (data.users.some(u => u.email === email)) {
            return HttpResponse.json({ message: 'Email already exists' }, { status: 400 })
        }

        const newUser = {
            id: data.users.length + 1,
            email,
            password,
            username,
            avatar: '',
            bio: '',
            createdAt: new Date().toISOString(),
            favoriteSubcategoryIds: [],
        }

        data.users.push(newUser)

        const { password: _, ...userWithoutPassword } = newUser
        const token = btoa(`${newUser.id}:${Date.now()}`)

        return HttpResponse.json({
            user: userWithoutPassword,
            token,
        })
    }),

    http.post('/api/auth/logout', () => {
        return HttpResponse.json({})
    }),

    // Users
    http.get('/api/users/me', async ({ request }) => {
        const token = request.headers.get('Authorization')?.replace('Bearer ', '')

        if (!token) {
            return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 })
        }

        try {
            const [userId] = atob(token).split(':')
            const user = data.users.find(u => u.id === parseInt(userId))

            if (!user) {
                return HttpResponse.json({ message: 'User not found' }, { status: 404 })
            }

            const { password, ...userWithoutPassword } = user
            return HttpResponse.json(userWithoutPassword)
        } catch {
            return HttpResponse.json({ message: 'Invalid token' }, { status: 401 })
        }
    }),

    http.get('/api/users/:id', ({ params }) => {
        const user = data.users.find(u => u.id === parseInt(params.id as string))

        if (!user) {
            return HttpResponse.json({ message: 'User not found' }, { status: 404 })
        }

        const { password, ...userWithoutPassword } = user
        return HttpResponse.json(userWithoutPassword)
    }),

    // Categories
    http.get('/api/categories', () => {
        return HttpResponse.json(data.mainCategories)
    }),

    http.get('/api/categories/tree', () => {
        const tree = data.mainCategories.map(mainCategory => ({
            mainCategory,
            subcategories: data.subcategories.filter(sc => sc.mainCategoryId === mainCategory.id)
        }))

        return HttpResponse.json(tree)
    }),

    // Subcategories
    http.get('/api/subcategories', () => {
        return HttpResponse.json(data.subcategories.filter(s => s.isApproved))
    }),

    http.get('/api/categories/:id/subcategories', ({ params }) => {
        const mainCategoryId = parseInt(params.id as string)
        const subcategories = data.subcategories.filter(
            sc => sc.mainCategoryId === mainCategoryId && sc.isApproved
        )
        return HttpResponse.json(subcategories)
    }),

    // Posts
    http.get('/api/posts', ({ request }) => {
        const url = new URL(request.url)
        const subcategoryId = url.searchParams.get('subcategoryId')
        const userId = url.searchParams.get('userId')
        const tag = url.searchParams.get('tag')
        const limit = parseInt(url.searchParams.get('limit') || '20')
        const offset = parseInt(url.searchParams.get('offset') || '0')

        let filteredPosts = data.posts

        if (subcategoryId) {
            filteredPosts = filteredPosts.filter(p => p.subcategoryId === parseInt(subcategoryId))
        }

        if (userId) {
            filteredPosts = filteredPosts.filter(p => p.authorId === parseInt(userId))
        }

        if (tag) {
            filteredPosts = filteredPosts.filter(p => p.tags.includes(tag))
        }

        const paginatedPosts = filteredPosts.slice(offset, offset + limit)

        return HttpResponse.json({
            posts: paginatedPosts,
            total: filteredPosts.length,
        })
    }),

    http.get('/api/posts/:id', ({ params }) => {
        const post = data.posts.find(p => p.id === parseInt(params.id as string))

        if (!post) {
            return HttpResponse.json({ message: 'Post not found' }, { status: 404 })
        }

        return HttpResponse.json(post)
    }),

    http.post('/api/posts', async ({ request }) => {
        const body = (await request.json()) as any

        const newPost = {
            id: data.posts.length + 1,
            ...body,
            likesCount: 0,
            commentsCount: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }

        data.posts.unshift(newPost)
        return HttpResponse.json(newPost)
    }),

    // Comments
    http.get('/api/posts/:id/comments', ({ params }) => {
        const postId = parseInt(params.id as string)
        const comments = data.comments.filter(c => c.postId === postId && c.parentId === null)

        // Build nested structure
        const buildNestedComments = (parentId: number | null): any[] => {
            return data.comments
                .filter(c => c.parentId === parentId && c.postId === postId)
                .map(comment => ({
                    ...comment,
                    replies: buildNestedComments(comment.id)
                }))
        }

        const nestedComments = comments.map(comment => ({
            ...comment,
            replies: buildNestedComments(comment.id)
        }))

        return HttpResponse.json(nestedComments)
    }),

    http.post('/api/comments', async ({ request }) => {
        const body = (await request.json()) as any

        const newComment = {
            id: data.comments.length + 1,
            ...body,
            likesCount: 0,
            createdAt: new Date().toISOString(),
            replies: [],
        }

        data.comments.push(newComment)

        // Update post comments count
        const post = data.posts.find(p => p.id === body.postId)
        if (post) {
            post.commentsCount += 1
        }

        return HttpResponse.json(newComment)
    }),

    // Likes
    http.post('/api/posts/:id/like', ({ params }) => {
        const postId = parseInt(params.id as string)
        const post = data.posts.find(p => p.id === postId)

        if (post) {
            post.likesCount += 1
        }

        return HttpResponse.json({})
    }),

    http.delete('/api/posts/:id/like', ({ params }) => {
        const postId = parseInt(params.id as string)
        const post = data.posts.find(p => p.id === postId)

        if (post && post.likesCount > 0) {
            post.likesCount -= 1
        }

        return HttpResponse.json({})
    }),

    // Notifications
    http.get('/api/notifications', ({ request }) => {
        const url = new URL(request.url)
        const limit = parseInt(url.searchParams.get('limit') || '10')
        const offset = parseInt(url.searchParams.get('offset') || '0')
        const unreadOnly = url.searchParams.get('unreadOnly') === 'true'

        let notifications = data.notifications

        if (unreadOnly) {
            notifications = notifications.filter(n => !n.isRead)
        }

        const paginatedNotifications = notifications.slice(offset, offset + limit)
        const unreadCount = data.notifications.filter(n => !n.isRead).length

        return HttpResponse.json({
            notifications: paginatedNotifications,
            total: notifications.length,
            unreadCount,
        })
    }),

    http.patch('/api/notifications/:id/read', ({ params }) => {
        const notification = data.notifications.find(n => n.id === parseInt(params.id as string))

        if (notification) {
            notification.isRead = true
        }

        return HttpResponse.json({})
    }),

    http.patch('/api/notifications/read-all', () => {
        data.notifications.forEach(n => n.isRead = true)
        return HttpResponse.json({})
    }),

    // Users (для получения списка) - ОДИН обработчик для /api/users
    http.get('/api/users', ({ request }) => {
        const url = new URL(request.url)
        const limit = parseInt(url.searchParams.get('limit') || '10')
        const offset = parseInt(url.searchParams.get('offset') || '0')
        const search = url.searchParams.get('search') || ''

        let filteredUsers = data.users.map(({ password, ...user }) => user)

        if (search) {
            filteredUsers = filteredUsers.filter(user =>
                user.username.toLowerCase().includes(search.toLowerCase()) ||
                user.email.toLowerCase().includes(search.toLowerCase()) ||
                user.bio.toLowerCase().includes(search.toLowerCase())
            )
        }

        const paginatedUsers = filteredUsers.slice(offset, offset + limit)

        return HttpResponse.json({
            users: paginatedUsers,
            total: filteredUsers.length,
        })
    }),

    // Search - ОДИН обработчик для /api/search
    http.get('/api/search', ({ request }) => {
        const url = new URL(request.url)
        const query = url.searchParams.get('q') || ''

        const results = {
            posts: data.posts.filter(post =>
                post.title.toLowerCase().includes(query.toLowerCase()) ||
                post.content.toLowerCase().includes(query.toLowerCase()) ||
                post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
            ).slice(0, 10),

            users: data.users.filter(user => {
                return user.username.toLowerCase().includes(query.toLowerCase()) ||
                    user.bio.toLowerCase().includes(query.toLowerCase())
            }).map(({ password, ...user }) => user).slice(0, 5),

            subcategories: data.subcategories.filter(subcategory =>
                subcategory.name.toLowerCase().includes(query.toLowerCase()) ||
                subcategory.description.toLowerCase().includes(query.toLowerCase()) ||
                subcategory.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
            ).slice(0, 5),
        }

        return HttpResponse.json(results)
    }),

    // Fallback
    http.all('/api/*', () => {
        return HttpResponse.json({ message: 'Not found' }, { status: 404 })
    }),
]