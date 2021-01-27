import constants from '../../lib/constants';

export default {
  getAllTrainees: async (parent, args, context) => {
    try {
      const { dataSources: { traineeApi } } = context;
      const { options: { skip, limit } } = args;
      const response = await traineeApi.getAll({ skip, limit });
      return response;
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
