import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { readFileSync } from 'fs';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';
import express from 'express';

import resolvers from './resolvers/index.js';
const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' });
import photos from './repository/photos.js';
import users from './repository/users.js';
import tags from './repository/tags.js';
const port = 4000;

export interface ServerContext {
    repository: {
        users: any;
        tags: any;
        photos: any;
    };
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer<ServerContext>({
    typeDefs,
    resolvers,
});
const app = express();
const httpServer = http.createServer(app);
await server.start();
app.use(
    '/graphql',
    bodyParser.json(),
    cors<cors.CorsRequest>(),
    expressMiddleware(server, {
        context: async ({ req }) => ({
            repository: {
                users: users,
                tags: tags,
                photos: photos
            }
        })
    })
);

app.use('/', (req, res) => {
    res.send('Home');
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests

// app.listen({ port: port }, () => {
//     console.log(`GraphQL Server running @ port: localhost:${port}`)
// })
await new Promise<void>((resolve) => httpServer.listen({ port: port, host: 'localhost' }, () => {
    console.log(`🚀 Server ready at: ${(httpServer.address() as { address: string }).address}:${port}`);
}));