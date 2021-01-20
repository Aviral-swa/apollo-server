export default {
  loginUser: async (parent, args, context) => {
    const { dataSources: { userApi } } = context;
    const { payload: { email, password } } = args;
    const response = await userApi.loginUser({ email, password });
    const { data } = response;
    return data.generated_token;
  },
};
