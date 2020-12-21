import express from 'express'
import spdy from 'spdy'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import routes from './routes'
dotenv.config({ path: '../.env' })

import mongodb from './config/connectDB'
mongodb().get()
const app = express()
const sslPath = path.join(__dirname, '/config')
const options = {
    key: fs.readFileSync(`${sslPath}/server.key`, 'utf-8'),
    cert: fs.readFileSync(`${sslPath}/server.crt`, 'utf-8'),
    passphrase: process.env.SSL_PW
}
app.use('', routes)

spdy.createServer(options, app).listen(process.env.PROTO_PORT, () => {
    console.log(`Server On https://localhost:${process.env.PROTO_PORT}`)
})
