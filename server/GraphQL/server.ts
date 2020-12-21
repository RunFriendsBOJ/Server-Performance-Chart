import { ApolloServer, PubSub } from 'apollo-server-express'
import express from 'express'
import expressPlayground from 'graphql-playground-middleware-express'
import { MongoClient } from 'mongodb'
import path from 'path'
import { readFileSync } from 'fs'
import { createServer } from 'http'
import cors from 'cors'

import dotenv from 'dotenv'
const envPath = path.join(__dirname, "../.env")
dotenv.config({ path: envPath })

import resolvers from './resolvers'
const typeDefs = readFileSync('./typeDefs.graphql', 'utf-8')

const app = express()

const start = async () => {
    const client = await MongoClient.connect(
        String(process.env.DB_HOST), {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    const db = client.db()
    const corsOptions = {
        origin: '*',
        optionsSuccessStatus: 200
    }
    const server = new ApolloServer({

    })
}