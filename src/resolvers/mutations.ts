import { ServerContext } from 'index.js';
import { MutationResolvers, Photo } from '../_generated/graphql.js';

const mutations: MutationResolvers = {
    postPhoto: (_, args: any, context: ServerContext): Photo => {
        return context.repository.photos.addPhoto(args);
    }
};

export default mutations;