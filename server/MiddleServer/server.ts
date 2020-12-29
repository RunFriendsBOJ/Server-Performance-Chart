import express from 'express'
import dotenv from 'dotenv'
import routes from './routes'

dotenv.config({ path: '../.env' })
const port = process.env.MID_SERVER
const app = express()

app.use('', routes)

app.listen(port, () => {
    console.log(`Server Run http://localhost:${port}`)
})