export default defineEventHandler(async () => {
    try {
        const response = await fetch('https://api.kanye.rest')
        const data = await response.json()

        return {
            success: true,
            ...data,
            timestamp: new Date().toISOString()
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
})