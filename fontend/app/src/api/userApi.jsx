import axiosClient from "./axiosClient";

const userApi = {
  getFilter(params) {
    const url = "/account/search";
    return axiosClient.get(
      url,
      { params },
      {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      }
    );
  },
  count(params) {
    const url = "/account/count";
    return axiosClient.get(
      url,
      { params },
      {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      }
    );
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
  lock(Id) {
    const url = `/account/lock/${Id}`;
    return axiosClient.get(url);
  },
  unlock(Id) {
    const url = `/account/unlock/${Id}`;
    return axiosClient.get(url);
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
  import(data) {
    const url = "/account/import";
    return axiosClient.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-Requested-With": "XMLHttpRequest",
      },
    });
  },
  getLikeId(params) {
    const url = "/account/get-like-id";
    return axiosClient.get(
      url,
      { params },
      {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    );
  },
  countLikeId(params) {
    const url = "/account/count-like-id";
    return axiosClient.get(
      url,
      { params },
      {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    );
  },
};

export default userApi;
