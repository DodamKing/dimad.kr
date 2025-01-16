// server/plugins/mongodb.ts
// 몽고디비 드라이버 사용함, 몽구스 사용하려면 따로 설정 다시해야 함함
import { MongoClient } from 'mongodb'

declare global {
    var $db: any
}

export default defineNitroPlugin(async () => {
    const config = useRuntimeConfig()

    try {
        const client = new MongoClient(config.MONGODB_URI)
        await client.connect()

        console.log('MongoDB Connected!')
        const db = client.db('dibe2')
        globalThis.$db = db
    } catch (error) {
        console.error('MongoDB connection error:', error)
    }
})