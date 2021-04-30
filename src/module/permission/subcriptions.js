import pubsub from '../../pubsub';
import constants from '../../lib/constants';

const { subcriptions: { UPDATE_PERMISSION } } = constants;
export default {
  updatePermissions: {
    subscribe: () => pubsub.asyncIterator([UPDATE_PERMISSION]),
  },
};
