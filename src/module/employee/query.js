import constants from '../../lib/constants';

export default {
  getEmployees: async (_, args, { dataSources }) => {
    try {
      const { employeeApi } = dataSources;
      const response = await employeeApi.getAll({});
      const { data: { employees } } = response;
      return employees;
    } catch (err) {
      if (!err.extensions) {
        return {
          message: constants.errorMessage,
        };
      }
      const { extensions: { response: { body } } } = err;
      return body;
    }
  },
};
