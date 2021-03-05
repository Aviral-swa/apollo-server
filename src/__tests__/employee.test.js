/* eslint-disable no-undef */
import 'regenerator-runtime/runtime.js';
import { ApolloServer, gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import schema from '../module';
import { EmployeeApi } from '../datasource';

const server = new ApolloServer({
  ...schema,
  dataSources: () => ({
    employeeApi: new EmployeeApi(),
  }),
});

const { query, mutate } = createTestClient(server);

describe('query', () => {
  test('should return all users', async () => {
    const GET_EMPLOYEES = gql`
      query GetEmployees{
        getEmployees{
          name
          role
          parent
        }
      }
    `;
    const {
      data,
    } = await query({ query: GET_EMPLOYEES });
    expect(data.getEmployees.length).toBeGreaterThan(1);
  });
});

describe('mutation', () => {
  test('should Add employee', async () => {
    const CREATE_EMPLOYEE = gql`
      mutation CreateEmployee($name: String!, $role: String!, $parent: String) {
        createEmployee(employee: { name: $name, role: $role, parent: $parent }) {
          name
        }
      }
    `;
    const {
      data: { createEmployee },
    } = await mutate({
      mutation: CREATE_EMPLOYEE,
      variables: {
        name: 'test',
        role: 'manager',
        parent: 'employee 1',
      },
    });
    expect(createEmployee.name).toBe('test');
  });

  test('should return duplication error', async () => {
    const CREATE_EMPLOYEE = gql`
      mutation CreateEmployee($name: String!, $role: String!, $parent: String) {
        createEmployee(employee: { name: $name, role: $role, parent: $parent }) {
          message
        }
      }
    `;
    const {
      data: { createEmployee },
    } = await mutate({
      mutation: CREATE_EMPLOYEE,
      variables: {
        name: 'test',
        role: 'manager',
        parent: 'employee 1',
      },
    });
    expect(createEmployee.message).toBe('Employee already exists');
  });

  test('should return invalid parent error', async () => {
    const CREATE_EMPLOYEE = gql`
      mutation CreateEmployee($name: String!, $role: String!, $parent: String) {
        createEmployee(employee: { name: $name, role: $role, parent: $parent }) {
          message
        }
      }
    `;
    const {
      data: { createEmployee },
    } = await mutate({
      mutation: CREATE_EMPLOYEE,
      variables: {
        name: 'test1',
        role: 'manager',
        parent: 'employ',
      },
    });
    expect(createEmployee.message).toBe('Parent does not exist');
  });
});
