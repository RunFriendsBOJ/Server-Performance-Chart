import { Db } from 'mongodb'


const getIdByPost = async (root: any, { id }: { id: number }, { db }: { db: Db }) => {
    const post = await db.collection('post').findOne({ id })
    return post
}

const getAllPosts = async (root: any, args: any, { db }: { db: Db }) => {
    const posts = await db.collection('post').find({}).toArray()
    return posts
}

export { getIdByPost, getAllPosts }