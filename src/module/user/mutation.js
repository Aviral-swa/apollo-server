import constants from '../../lib/constants';

export default {
  loginUser: async (parent, args, context) => {
    try {
      const { dataSources: { userApi } } = context;
      const { payload: { email, password } } = args;
      const response = await userApi.loginUser({ email, password });
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
