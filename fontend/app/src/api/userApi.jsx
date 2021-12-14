import axiosClient from "./axiosClient";

const userApi = {
  getAll(params) {
    const url = "/account/get-all";
    return axiosClient.get(url, { params });
  },
  get(params) {
    const url = "/account/get-by-id";
    return axiosClient.get(url, { params });
  },
  register(data) {
    const url = "/account/register";
    return axiosClient.post(url, data);
  },
  login(data) {
    const url = "/account/login";
    return axiosClient.post(url, data);
  },
  update(data) {
    const url = `/account/update/${data.id}`;
    return axiosClient.put(url, data);
  },
  remove(id) {
    const url = `/account/remove/${id}`;
    return axiosClient.delete(url);
  },
};

export default userApi;
