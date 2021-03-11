import constants from '../../lib/constants';

export default {
  getPermission: async (parent, args, { dataSources }) => {
    try {
      const { permissionApi } = dataSources;
      const response = await permissionApi.getAll();
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
