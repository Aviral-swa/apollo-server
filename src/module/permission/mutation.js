import constants from '../../lib/constants';

export default {
  updatePermission: async (parent, args, { dataSources }) => {
    try {
      const { permissionApi } = dataSources;
      const { data: { originalId, resources } } = args;
      const response = await permissionApi.update({ originalId, resources });
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
