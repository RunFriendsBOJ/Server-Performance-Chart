import { exec } from 'child_process'
import { Response, Request } from 'express'
import mongodb from './connectDB'
import fs from 'fs'
import path from 'path'

const logPath = path.join(__dirname)
console.log(logPath)
const artillery = async (req: Request, res: Response, type: String) => {
    const db = await mongodb().get()
    const queryId = req.params.id
    const queryData = await db.collection(type).findOne({ queryId })
    if (queryData === null) {
        exec(`artillery quick --duration 3 --rate 10 -n 20 http://localhost:5000/post/1 -o ${logPath}/${type}Log/${queryId}.json`, (error, stdout, stderr) => {
            if (error || stderr) {
                res.status(400)
            }
            const logJson = fs.readFileSync(`${logPath}/${type}Log/${queryId}.json`, 'utf-8')
            const json = JSON.parse(logJson)
            res.status(200).json(json)
        })
    }
    res.status(200).json(queryData.json)
}

export { artillery }