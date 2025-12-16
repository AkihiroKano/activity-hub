import mockData from './data'

export function resetMocks() {
    localStorage.removeItem('activityhub-mocks')
    window.location.reload()
}

export function getMockStats() {
    return {
        users: mockData.users.length,
        posts: mockData.posts.length,
        comments: mockData.comments.length,
        subcategories: mockData.subcategories.length,
        notifications: mockData.notifications.length,
    }
}