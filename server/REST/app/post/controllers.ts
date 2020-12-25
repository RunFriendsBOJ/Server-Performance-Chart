import { Request, Response } from 'express'
import mongodb from '../../../config/connectDB'

const allPost = async (req: Request, res: Response) => {
    const db = await mongodb().get()
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    console.log(`ip=${ip}  call=${process.env.REST_SERVER}/post/all`)
    const obj = {
        items: await db.collection('post').find({}).toArray()
    }
    res.status(200).send(obj)
}

const getPost = async (req: Request, res: Response) => {
    const db = await mongodb().get()
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    console.log(`ip=${ip}  call=${process.env.REST_SERVER}/post/${req.params.id}`)
    const item = await db.collection('post').findOne({ id: ~~req.params.id })
    res.status(200).send(item)
}

export { allPost, getPost }