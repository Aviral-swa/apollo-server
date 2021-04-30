import { fileLoader, mergeTypes } from 'merge-graphql-schemas';
import path from 'path';
import GraphqlJson from 'graphql-type-json';
import { getMyProfile, loginMutation } from './user';
import { getAll, crudMutations, traineeSubcriptions } from './trainee';
import { employeeGetQuery, employeeMutation } from './employee';
import { permissionMutation, permissionQuery, permissionSub } from './permission';

const dirname = path.resolve();

const typesArray = fileLoader(path.join(dirname, './**/*.graphql'));

const typeDefs = mergeTypes(typesArray, { all: true });

export default {
  resolvers: {
    JSON: GraphqlJson,
    Query: {
      ...getMyProfile,
      ...getAll,
      ...employeeGetQuery,
      ...permissionQuery,
    },
    Mutation: {
      ...loginMutation,
      ...crudMutations,
      ...employeeMutation,
      ...permissionMutation,
    },
    Subscription: {
      ...traineeSubcriptions,
      ...permissionSub,
    },
  },
  typeDefs,
};
