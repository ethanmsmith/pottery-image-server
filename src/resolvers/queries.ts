import { QueryResolvers } from '../_generated/graphql.js';

const queries: QueryResolvers = {
  allPhotos: (_, __, context) => context.dataSources.photos,
  allUsers: (_, __, context) => context.dataSources.users,
  totalUsers: (_, __, context) => context.dataSources.users.length,
  totalPhotos: (_, __, context) => context.dataSources.photos.length
};

export default queries; 