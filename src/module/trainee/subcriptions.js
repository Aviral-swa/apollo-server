import pubsub from '../../pubsub';
import constants from '../../lib/constants';

const { subcriptions: { TRAINEE_ADDED, TRAINEE_UPDATED, TRAINEE_DELETED } } = constants;
export default {
  traineeAdded: {
    subscribe: () => pubsub.asyncIterator([TRAINEE_ADDED]),
  },
  traineeUpdated: {
    subscribe: () => pubsub.asyncIterator([TRAINEE_UPDATED]),
  },
  traineeDeleted: {
    subscribe: () => pubsub.asyncIterator([TRAINEE_DELETED]),
  },
};
