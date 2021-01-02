import { Request, Response } from 'express'

import { artillery } from '../../../config/getArtillery'

const getQuery = async (req: Request, res: Response) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    const queryId = req.params.id
    console.log(`ip:${ip} , queryId:${queryId}`)
    artillery(req, res, 'ProtoBuf')
}

export { getQuery }