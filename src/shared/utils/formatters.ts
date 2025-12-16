export function formatNumber(num: number): string {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
    }
    return num.toString()
}

export function formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60

    if (hours === 0) {
        return `${mins} мин`
    }

    if (mins === 0) {
        return `${hours} ч`
    }

    return `${hours} ч ${mins} мин`
}

export function formatDistance(meters: number): string {
    if (meters < 1000) {
        return `${Math.round(meters)} м`
    }

    const km = meters / 1000
    return `${km.toFixed(1)} км`
}
