import UserRepository from '../../service/user';

export default {
  getAllTrainees: () => UserRepository.getAllUsers(),
};
