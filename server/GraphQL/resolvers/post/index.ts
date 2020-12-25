import { Db } from 'mongodb'


const getIdByPost = async (root: any, { id }: { id: number }, { db, ip }: { db: Db, ip: String }) => {
    console.log(`ip=${ip}  call=${process.env.GQL_SERVER} : getIdByPost`)
    const post = await db.collection('post').findOne({ id })
    return post
}

const getAllPosts = async (root: any, args: any, { db, ip }: { db: Db, ip: String }) => {
    console.log(`ip=${ip}  call=${process.env.GQL_SERVER} : getAllPosts`)
    const posts = await db.collection('post').find({}).toArray()
    return posts
}

export { getIdByPost, getAllPosts }