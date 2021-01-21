export default {
  getAllTrainees: async (parent, args, context) => {
    const { dataSources: { traineeApi } } = context;
    const response = await traineeApi.getAll();
    const { data: { traineesList } } = response;
    return traineesList;
  },
};
