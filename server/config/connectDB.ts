import path from 'path'
import env from './env'
import { MongoClient } from 'mongodb'

const envPath = path.join(__dirname, "../../.env")

let db: any = null
let instance: number = 0

const connectDB = () => {


    const connect = async () => {
        try {
            const client = await MongoClient.connect(
                process.env.DB_HOST
                    ? process.env.DB_HOST
                    : env.DB_HOST
                , {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                })
            const _db = client.db()
            return _db
        } catch (e) {
            return e
        }
    }

    const get = async () => {
        try {
            ++instance
            console.log(`DB called ${instance} times`)

            if (db != null) {
                return db
            } else {
                console.log(`getting new db connection`)
                db = await connect()
                return db
            }
        } catch (e) {
            return e
        }
    }

    return { get }
}

export default connectDB