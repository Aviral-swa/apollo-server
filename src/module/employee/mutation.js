import constants from '../../lib/constants';

export default {
  createEmployee: async (_, args, { dataSources }) => {
    try {
      const { employeeApi } = dataSources;
      const {
        employee: {
          name, role, parent = '',
        },
      } = args;
      const response = await employeeApi.create({
        name, role, parent,
      });
      return response.data;
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
