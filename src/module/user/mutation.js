export default {
  loginUser: async (parent, args, { dataSources }) => {
    const { userApi } = dataSources;
    const { payload: { email, password } } = args;
    const response = await userApi.loginUser({ email, password });
    const { data } = response;
    return data.generated_token;
  },
};
