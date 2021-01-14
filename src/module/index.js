import { fileLoader, mergeTypes } from 'merge-graphql-schemas';
import path from 'path';
import { getMyProfile } from './user';

const dirname = path.resolve();
const types = fileLoader(path.join(dirname, './**/*.graphql'));
const typeDefs = mergeTypes(types, { all: true });

export default {
  resolvers: {
    Query: getMyProfile,
  },
  typeDefs,
};
