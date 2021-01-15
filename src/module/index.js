import { fileLoader, mergeTypes } from 'merge-graphql-schemas';
import path from 'path';
import { getMyProfile } from './user';
import { user } from './trainee';
import mutations from './trainee/mutation';

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
  },
  typeDefs,
};
