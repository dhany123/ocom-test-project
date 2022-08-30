import ApiClient from '/./src/api/index';

const endpoint = '/library';

export default {
    get() {
      return ApiClient.get(endpoint);
    },
}


