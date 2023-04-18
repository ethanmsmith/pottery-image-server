import { ApolloServer } from '@apollo/server';
import { readFileSync } from 'fs';
import { startStandaloneServer } from '@apollo/server/standalone';
import { Photo, PhotoCategory, User } from './_generated/graphql.js';
import resolvers from './resolvers/index.js';
const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' });

const photos: Photo[] = [
    {
        id: 'DSCN00001',
        created: '1995-02-02',
        description: 'person',
        name: 'me',
        url: 'https://ethansmith.io',
        category: PhotoCategory.Portrait,
        postedBy: {
            githubLogin: 'ethanmsmith',
            name: 'ethan',
            avatar: '',
        }
    },
    {
        id: 'DSCN00002',
        created: '2023-02-02',
        description: 'field',
        name: 'grass',
        url: 'https://athenaeum.icu',
        category: PhotoCategory.Landscape,
        postedBy: {
            githubLogin: 'ethanmsmith',
            name: 'ethan',
            avatar: '',
        }
    },
    {
        id: 'DSCN00003',
        created: '2020-02-20',
        description: 'animal',
        name: 'bird',
        url: 'https://github.io',
        category: PhotoCategory.Nature,
        postedBy: {
            githubLogin: 'bmkuter',
            name: 'ben',
            avatar: '',
        }
    },
    {
        id: 'DSCN00004',
        created: '2023-04-02',
        description: 'street',
        name: 'digital',
        url: 'https://bmk.io',
        category: PhotoCategory.Graphic,
        postedBy: {
            githubLogin: 'bmkuter',
            name: 'ben',
            avatar: '',
        }
    },
];

const users: User[] = [
    {
        githubLogin: 'ethanmsmith',
        name: 'ethan',
        avatar: 'dog',
    },
    {
        githubLogin: 'bmkuter',
        name: 'ben',
        avatar: 'cat',
    }
]

export interface ServerContext {
    dataSources: {
        photos: Photo[];
        users: User[];
    };
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer<ServerContext>({
    typeDefs,
    resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
    context: async () => {
        return {
            // We are using a static data set for this example, but normally
            // this would be where you'd add your data source connections
            // or your REST API classes.
            dataSources: {
                photos: photos,
                users: users
            },
            port: 4000
        };
    },
});

console.log(`🚀 Server ready at: ${url}`);