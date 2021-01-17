import UserRepository from '../../service/user';
import constants from '../../lib/constants';
import pubsub from '../../pubsub';

const { subcriptions: { TRAINEE_ADDED, TRAINEE_UPDATED, TRAINEE_DELETED } } = constants;
export default {
  createTrainee: (parent, args) => {
    const { user } = args;
    const addedTrainee = UserRepository.createUser(user);
    pubsub.publish(TRAINEE_ADDED, { traineeAdded: addedTrainee });
    return addedTrainee;
  },
  updateTrainee: (parent, args) => {
    const { id, role, name } = args;
    const updatedTrainee = UserRepository.updateUser(id, role, name);
    pubsub.publish(TRAINEE_UPDATED, { traineeUpdated: updatedTrainee });
    return updatedTrainee;
  },
  deleteTrainee: (parent, args) => {
    const { id } = args;
    const deletedTraineeId = UserRepository.deleteUser(id);
    pubsub.publish(TRAINEE_DELETED, { traineeDeleted: deletedTraineeId });
    return deletedTraineeId;
  },

};
