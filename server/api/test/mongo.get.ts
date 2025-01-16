export default defineEventHandler(async (event) => {
    try {
        const dbName = globalThis.$db.databaseName

        return {
            success: true,
            message: `Database connected: ${dbName}`,
            timestamp: new Date().toISOString()
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
})