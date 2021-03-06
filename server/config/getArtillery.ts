import { exec } from 'child_process'
import { Response, Request } from 'express'
import mongodb from './connectDB'
import { readFileSync } from 'fs'
import path from 'path'

const logPath = path.join(__dirname)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

const artillery = async (req: Request, res: Response, type: String) => {
    const db = await mongodb().get()
    const queryId = req.params.id
    const queryData = await db.collection(type).findOne({ queryId })
    const {
        address, // 주소
        duration, // 시간
        arrivalRate, // 초당 리퀘스트
        clientCount // 동시 접속수
    } = req.body
    const query = `artillery quick --duration ${duration} --rate ${arrivalRate} -n ${clientCount} ${address} -o ${logPath}/Log/${type}.${queryId}.json`
    if (queryData === null) {
        exec(query, (error, stdout, stderr) => {
            if (error || stderr) {
                res.status(400)
            }
            const jsonFile = readFileSync(`${logPath}/Log/${type}.${queryId}.json`, 'utf-8')
            const json = JSON.parse(jsonFile)
            res.status(200).json(json)
        })
    }
    else res.status(200).json(queryData)
}

export { artillery }