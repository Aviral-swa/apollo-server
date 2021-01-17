import { fileLoader, mergeTypes } from 'merge-graphql-schemas';
import path from 'path';
import { getMyProfile } from './user';
import { user, mutations, subcriptions } from './trainee';

const dirname = path.resolve();

const typesArray = fileLoader(path.join(dirname, './**/*.graphql'));

const typeDefs = mergeTypes(typesArray, { all: true });

export default {
  resolvers: {
    Query: {
      ...getMyProfile,
      ...user,
    },
    Mutation: mutations,
    Subscription: subcriptions,
  },
  typeDefs,
};
