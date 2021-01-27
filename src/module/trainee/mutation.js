import constants from '../../lib/constants';
import pubsub from '../../pubsub';

const { subcriptions: { TRAINEE_ADDED, TRAINEE_UPDATED, TRAINEE_DELETED } } = constants;
export default {
  createTrainee: async (parent, args, context) => {
    const { dataSources: { traineeApi } } = context;
    const {
      user: {
        name, email, role, password,
      },
    } = args;
    const response = await traineeApi.create({
      name, email, role, password,
    });
    pubsub.publish(TRAINEE_ADDED, { traineeAdded: response.data });
    return response.data;
  },
  updateTrainee: async (parent, args, context) => {
    const { dataSources: { traineeApi } } = context;
    const { user: { id, name, email } } = args;
    const response = await traineeApi.update({
      originalId: id,
      dataToUpdate: {
        name,
        email,
      },
    });
    pubsub.publish(TRAINEE_UPDATED, { traineeUpdated: response.data });
    return response.data;
  },
  deleteTrainee: async (parent, args, context) => {
    const { dataSources: { traineeApi } } = context;
    const { id } = args;
    const deletedTrainee = await traineeApi.deleteTrainee(id);
    pubsub.publish(TRAINEE_DELETED, { traineeDeleted: deletedTrainee.message });
    return deletedTrainee.message;
  },

};
