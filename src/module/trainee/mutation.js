import UserRepository from '../../service/user';

export default {
  createTrainee: (parent, args) => {
    const { user } = args;
    return UserRepository.createUser(user);
  },
  updateTrainee: (parent, args) => {
    const { id, role, name } = args;
    return UserRepository.updateUser(id, role, name);
  },
  deleteTrainee: (parent, args) => {
    const { id } = args;
    return UserRepository.deleteUser(id);
  },

};
