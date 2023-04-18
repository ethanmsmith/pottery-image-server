import { Resolvers } from '../_generated/graphql';
import queries from './queries.js';
import mutations from './mutations.js';
import { GraphQLScalarType } from 'graphql';

// Note this "Resolvers" type isn't strictly necessary because we are already
// separately type checking our queries and resolvers. However, the "Resolvers"
// generated types is useful syntax if you are defining your resolvers
// in a single file.
const resolvers: Resolvers = {
    Query: queries, 
    Mutation: mutations, 
    Photo: {
        url: parent => `https://athenaeum.icu/img/${parent.id}.jpg`,
        postedBy: (parent, _, context) => context.dataSources.users.find(u => u.githubLogin === parent.postedBy.githubLogin),
        taggedUsers: (parent, _, context) => context.dataSources.tags.filter(tag => tag.photoId === parent.id).map(tag => tag.userId).map(userId => context.dataSources.users.find(u => u.githubLogin === userId))
    },
    User: {
        postedPhotos: (parent, _, context) => context.dataSources.photos.filter(p => p.postedBy.githubLogin === parent.githubLogin),
        inPhotos: (parent, _, context) => context.dataSources.tags.filter(tag => tag.userId === parent.githubLogin).map(tag => tag.photoId).map(photoId => context.dataSources.photos.find(p => p.id === photoId))
    },
    DateTime: new GraphQLScalarType({
        name: 'DateTime',
        description: 'A valid date time value',
        parseValue: (value: string) => new Date(value),
        serialize: (value: string) => new Date(value).toISOString(),
        parseLiteral: (ast: any) => ast.value
    })
};

export default resolvers;
