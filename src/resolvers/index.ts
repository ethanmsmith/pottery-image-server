import { Resolvers } from '../_generated/graphql';
import queries from './queries.js';
import mutations from './mutations.js';

// Note this "Resolvers" type isn't strictly necessary because we are already
// separately type checking our queries and resolvers. However, the "Resolvers"
// generated types is useful syntax if you are defining your resolvers
// in a single file.
const resolvers: Resolvers = {
    Query: queries, Mutation: mutations, Photo: {
        url: parent => `https://athenaeum.icu/img/${parent.id}.jpg`
    }
};

export default resolvers;
