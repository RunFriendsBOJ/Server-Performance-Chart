import { Request, Response } from 'express'
import mongodb from '../../../config/connectDB'
const { Posts, Post } = require('../../../config/proto/protobuf')

const allPost = async (req: Request, res: Response) => {
    const db = await mongodb().get()
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    console.log(`ip=${ip}  call=${process.env.PROTO_SERVER}/post/all`)
    const obj = {
        items: await db.collection('post').find({}).toArray()
    }
    const buffer: Buffer = Posts.encode(obj)
    res.status(200).send(buffer)
}

const getPost = async (req: Request, res: Response) => {
    const db = await mongodb().get()
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    console.log(`ip=${ip}  call=${process.env.PROTO_SERVER}/post/${req.params.id}`)
    let item = await db.collection('post').findOne({ id: ~~req.params.id })
    const buffer: Buffer = Post.encode(item)
    res.status(200).send(buffer)
}

export { allPost, getPost }