import { Request, Response } from 'express'
import mongodb from '../../config/connectDB'

const allPost = async (req: Request, res: Response) => {
    const db = await mongodb().get()
    const obj = {
        items: await db.collection('post').find({}).toArray()
    }
    res.status(200).send(obj)
}

const getPost = async (req: Request, res: Response) => {
    const db = await mongodb().get()
    let item = await db.collection('post').findOne({ id: ~~req.params.id })
    res.status(200).send(item)
}

export { allPost, getPost }