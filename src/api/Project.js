import ApiClient from '/./src/api/index';

const endpoint = '/project';

export default {
    get() {
      return ApiClient.get(endpoint);
    },
    find(id) {
      return ApiClient.get(`${endpoint}/${id}`);
    },
    add(data) {
      return ApiClient.post(endpoint, data);
    },
    update(data) {
      return ApiClient.put(`${endpoint}/${data.id}`, data);
    },
    remove(id) {
      return ApiClient.delete(`${endpoint}/${id}`);
    },
}


