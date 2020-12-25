import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import expressPlayground from 'graphql-playground-middleware-express'
import path from 'path'
import { readFileSync } from 'fs'
import { createServer } from 'http'
import cors from 'cors'
import mongodb from '../config/connectDB'
import dotenv from 'dotenv'
const envPath = path.join(__dirname, "../.env")
dotenv.config({ path: envPath })

import * as resolvers from './resolvers/index'
const typeDefs = readFileSync('./typeDefs.graphql', 'utf-8')

const app = express()


const start = async () => {
    const db = await mongodb().get()
    const corsOptions = {
        origin: '*',
        optionsSuccessStatus: 200
    }
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }: { req: express.Request }) => {
            const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
            return { db, ip }
        }
    })

    server.applyMiddleware({ app })

    app.get('/', expressPlayground({ endpoint: '/graphql' }))
    app.use(cors(corsOptions))

    const httpServer = createServer(app)
    server.installSubscriptionHandlers(httpServer)

    httpServer.timeout = 5000
    httpServer.listen({ port: process.env.GQL_PORT }, () => {
        console.log(`GQL Server Running at http://localhost:${process.env.GQL_PORT}${server.graphqlPath}`)
    })
}

start()