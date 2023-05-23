import { Photo, QueryResolvers } from '../_generated/graphql.js';
import { User } from '../_generated/graphql.js';

const queries: QueryResolvers = {
  allPhotos: (_, __, context): Promise<Photo[]> => {
    return context.repository.photos.all();
  },
  allUsers: (_, __, context): Promise<User[]> => {
    return context.repository.users.all();
  },
  totalUsers: (_, __, context): Promise<number> => {
    return context.repository.users.count();
  },
  totalPhotos: (_, __, context): Promise<number> => {
   return context.repository.photos.count(); 
  },
  me: (parent, args, {currentUser}) => currentUser
};

export default queries; 