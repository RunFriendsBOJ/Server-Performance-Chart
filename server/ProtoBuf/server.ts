import express from 'express'
import dotenv from 'dotenv'
import routes from './routes'
dotenv.config({ path: '../.env' })

import mongodb from '../config/connectDB'
mongodb().get()
const app = express()
app.use('', routes)

const port = process.env.PROTO_PORT || 4000
app.listen(port, () => {
    console.log(`Server Running at http://localhost:${port}`)
})