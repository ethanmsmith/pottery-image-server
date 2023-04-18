import { MutationResolvers } from '../_generated/graphql.js';

const mutations: MutationResolvers = {
    postPhoto: (parent: any, args: any, context: any) => {
        const newPhoto = {
            id: 0,
            ...args.photo
        }
        context.dataSources.photos.push(newPhoto)

        return newPhoto
    }
};

export default mutations;