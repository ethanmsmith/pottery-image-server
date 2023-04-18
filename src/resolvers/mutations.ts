import { MutationResolvers } from '../_generated/graphql.js';

const mutations: MutationResolvers = {
    postPhoto: (parent: any, args: any, context: any) => {
        const newPhoto = {
            id: 0,
            postedBy: {
                githubLogin: "ethanmsmith",
                name: "ethan"
            },
            ...args.input
        }
        context.dataSources.photos.push(newPhoto)

        return newPhoto
    }
};

export default mutations;