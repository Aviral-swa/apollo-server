import { fileLoader, mergeTypes } from 'merge-graphql-schemas';
import path from 'path';
import { getMyProfile, loginMutation } from './user';
import { getAll, crudMutations, subcriptions } from './trainee';
import { employeeGetQuery, employeeMutation } from './employee';

const dirname = path.resolve();

const typesArray = fileLoader(path.join(dirname, './**/*.graphql'));

const typeDefs = mergeTypes(typesArray, { all: true });

export default {
  resolvers: {
    Query: {
      ...getMyProfile,
      ...getAll,
      ...employeeGetQuery,
    },
    Mutation: {
      ...loginMutation,
      ...crudMutations,
      ...employeeMutation,
    },
    Subscription: subcriptions,
  },
  typeDefs,
};
