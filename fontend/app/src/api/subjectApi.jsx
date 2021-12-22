import axiosClient from "./axiosClient";

const subjectApi = {
  getFilter(params) {
    const url = "/subject/search";
    return axiosClient.get(
      url,
      { params },
      {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      }
    );
  },
  count(params) {
    const url = "/subject/count";
    return axiosClient.get(
      url,
      { params },
      {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      }
    );
  },
  get(params) {
    const url = "/subject/get-by-id";
    return axiosClient.get(url, { params });
  },
  update(data, params) {
    const url = "/subject/update";
    return axiosClient.post(
      url,
      data,
      { params },
      {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      }
    );
  },

  lock(params) {
    const url = "/subject/lock";
    return axiosClient.get(
      url,
      { params },
      {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      }
    );
  },
  unlock(params) {
    const url = "/subject/unlock";
    return axiosClient.get(
      url,
      { params },
      {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      }
    );
  },

  add(data) {
    const url = "/subject/add";
    return axiosClient.post(url, data, {
      headers: { "X-Requested-With": "XMLHttpRequest" },
    });
  },
  import(data) {
    const url = "/subject/import";
    return axiosClient.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-Requested-With": "XMLHttpRequest",
      },
    });
  },
  getOte() {
    const url = "/ote/get-subject-ote";
    return axiosClient.get(url, {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    });
  },
  updateOte(data) {
    const url = "/ote/update-subject-ote";
    return axiosClient.post(url, data, {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    });
  },
};

export default subjectApi;
