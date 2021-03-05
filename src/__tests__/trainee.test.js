/* eslint-disable no-undef */
import 'regenerator-runtime/runtime.js';
import { ApolloServer, gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import schema from '../module';
import { TraineeApi } from '../datasource';

const server = new ApolloServer({
  ...schema,
  dataSources: () => ({
    traineeApi: new TraineeApi(),
  }),
  context: ({ req }) => {
    if (req) {
      return {
        token: req.headers.authorization,
      };
    }
    return {};
  },
});

const { query } = createTestClient(server);

describe('query', () => {
  test('should thow authorization error', async () => {
    const GET_ALL_TRAINEES = gql`
    query GetAllTrainees($skip: Int, $limit: Int) {
      getAllTrainees(options: { skip: $skip, limit: $limit }) {
        status
      }
      }
    `;
    const {
      data: { getAllTrainees },
    } = await query({ query: GET_ALL_TRAINEES });
    expect(getAllTrainees.status).toBe('403');
  });
});
