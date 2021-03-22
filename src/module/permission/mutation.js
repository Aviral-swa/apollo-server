import constants from '../../lib/constants';
import pubsub from '../../pubsub';

const { subcriptions: { UPDATE_PERMISSION }, permissionCacheKey } = constants;
export default {
  updatePermission: async (parent, args, { dataSources, redis }) => {
    try {
      const { permissionApi } = dataSources;
      const { data: { originalId, resources } } = args;
      const response = await permissionApi.update({ originalId, resources });
      const previous = await redis.lrange(permissionCacheKey, 0, -1);
      const index = previous.findIndex(
        (ele) => JSON.parse(ele).originalId === originalId,
      );
      await redis.lset(permissionCacheKey, index, JSON.stringify(response.data));
      pubsub.publish(UPDATE_PERMISSION, { updatePermissions: response });
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
