import constants from '../../lib/constants';

export default {
  getPermission: async (parent, args, { dataSources, redis }) => {
    try {
      const { permissionCacheKey, succesStatus, fetchedSuccessfully } = constants;
      const { permissionApi } = dataSources;
      const { id: { email } } = args;
      const inCache = await redis.lrange(permissionCacheKey, 0, -1);
      if (!inCache.length) {
        // fill cache
        const permissions = await permissionApi.getAll({ email });
        const permissionsStrings = permissions.data.map((permission) => JSON.stringify(permission));
        await redis.lpush(permissionCacheKey, ...permissionsStrings);
      }
      const cache = await redis.lrange(permissionCacheKey, 0, -1);
      const response = {
        message: fetchedSuccessfully,
        data: cache.map((x) => JSON.parse(x)),
        status: succesStatus,
      };
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
