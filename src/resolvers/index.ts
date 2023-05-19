import { Photo, Resolvers, User } from '../_generated/graphql';
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
        postedBy: (parent, _, context) => context.repository.users.all().then((users: User[]) => users.find((u: User) => u.githubLogin === parent.postedBy.githubLogin)),
        taggedUsers: (parent, _, context) => context.repository.tags.all().then(tags => tags.filter(tag => tag.photoId === parent.id).map(tag => tag.userId).map(userId => context.repository.users.all().then((users: User[]) => users.find((u: User) => u.id === userId))))
    },
    User: {
        postedPhotos: (parent, _, context) => context.repository.photos.all().then((photos: Photo[]) => photos.filter((p: Photo) => p.postedBy.id === parent.id )),
        inPhotos: (parent, _, context) => context.repository.tags.all().then(tags => tags.filter(tag => tag.userId === parent.id).map(tag => tag.photoId).map(photoId => context.repository.photos.all().then((photos: Photo[]) => photos.find((p: Photo) => p.id === photoId))))
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
