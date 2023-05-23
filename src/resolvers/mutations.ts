import { ServerContext } from 'index.js';
import { AuthPayload, MutationResolvers, Photo, User } from '../_generated/graphql.js';
import { authorizeWithGithub } from '../authorization/github.js';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()


const mutations: MutationResolvers = {
    postPhoto: async (_, args: any, { repository, currentUser }): Promise<Photo> => {
        if (!currentUser.hasOwnProperty('id')) {
            throw new Error('no valid user');
        }

        return new Promise<Photo>((resolve, _) => {
            resolve(repository.photos.add({ ...args.input, postedBy: currentUser, created: (new Date()).toISOString() }));
        });
    },
    githubAuth: async (parent, { code }, context: ServerContext): Promise<AuthPayload> => {
        let { message, access_token, avatar_url, login, name } = await authorizeWithGithub({
            client_id: process.env["CLIENT_ID"],
            client_secret: process.env["CLIENT_SECRET"],
            code
        });

        if (message) {
            throw new Error(message);
        }

        const latestUserInfo = {
            user: {
                name: name, githubLogin: login, avatar: avatar_url
            },
            token: access_token
        }

        const user = context.repository.users.addOrUpdate(latestUserInfo);

        return { user, token: access_token }
    }
};

export default mutations;