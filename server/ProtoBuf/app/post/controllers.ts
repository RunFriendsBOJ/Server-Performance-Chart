import { Request, Response } from 'express'
import mongodb from '../../config/connectDB'
const { Posts, Post } = require('../../config/proto/protobuf')

const allPost = async (req: Request, res: Response) => {
    const db = await mongodb().get()
    const obj = {
        items: await db.collection('post').find({}).toArray()
    }
    const buffer: Buffer = Posts.encode(obj)
    res.status(200).send(buffer)
}

const getPost = async (req: Request, res: Response) => {
    const db = await mongodb().get()
    let item = await db.collection('post').findOne({ id: ~~req.params.id })
    const buffer: Buffer = Post.encode(item)
    res.status(200).send(buffer)
}

export { allPost, getPost }