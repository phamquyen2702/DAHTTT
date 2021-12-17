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
  update(data, params) {
    const url = "/account/update";
    return axiosClient.post(
      url,
      data,
      { params },
      {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      }
    );
  },
  remove(id) {
    const url = `/account/remove/${id}`;
    return axiosClient.delete(url);
  },
  changePassword(data) {
    const url = "/account/change-password";
    return axiosClient.post(url, data, {
      headers: { "X-Requested-With": "XMLHttpRequest" },
    });
  },
  add(data) {
    const url = "/account/add";
    return axiosClient.post(url, data, {
      headers: { "X-Requested-With": "XMLHttpRequest" },
    });
  },
};

export default userApi;
