import { Db, MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

const envPath = path.join(__dirname, "../.env")
const jsonBuf = fs.readFileSync('./post.json', 'utf-8')
const json = JSON.parse(jsonBuf)
dotenv.config({ path: envPath })

const initDB = async () => {
    const client = await MongoClient.connect(
        String(process.env.DB_HOST), {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
    )
    const db = client.db()
    await db.collection('post').deleteMany({})
    await db.collection('post').insertMany(json)
    process.exit(0)
}

initDB()