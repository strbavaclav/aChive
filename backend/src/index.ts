import { ApolloServer } from '@apollo/server'
import express from 'express'
import http from 'http'
import cors from 'cors'
import 'dotenv/config'
import { client } from './database/database.config'
import mongoose from 'mongoose'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import {
    ExpressContextFunctionArgument,
    expressMiddleware,
} from '@apollo/server/express4'
import schemaDefinition from './graphql/rootTypeDefs'
import rootResolver from './graphql/rootResolver'
import { parseAndVerifyJWT } from './libs/jwt'
import { JwtPayload } from 'jsonwebtoken'

export interface CustomContext {
    authUser: JwtPayload | null
}

const init = async () => {
    const app = express()
    const httpServer = http.createServer(app)
    const server = new ApolloServer<CustomContext>({
        typeDefs: [schemaDefinition],
        resolvers: rootResolver,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    })

    await server.start()

    mongoose.connect(process.env.MONGODB_URI!!)

    const customContext = async ({
        req,
    }: ExpressContextFunctionArgument): Promise<CustomContext> => {
        const authToken = req.headers.authorization || ''
        const authUser = parseAndVerifyJWT(authToken)

        return {
            authUser,
        }
    }

    async function run() {
        try {
            await client.connect()
            await client.db('admin').command({ ping: 1 })
            console.log(
                'Pinged your deployment. You successfully connected to MongoDB!'
            )
        } finally {
            await client.close()
        }
    }
    run().catch(console.dir)

    app.use(
        '/graphql',
        cors<cors.CorsRequest>(),
        express.json(),
        expressMiddleware(server, { context: customContext })
    )

    app.use((req, res) => {
        res.status(404).json('404 - endpoint do not exits!')
    })

    await httpServer.listen({ port: 4000 })
    console.log(`🚀 Server ready at http://localhost:4000/graphql`)
}

init()
