import axiosClient from "./axiosClient";

const classApi = {
  getFilter(params) {
    const url = "/class/search";
    return axiosClient.get(
      url,
      { params },
      {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      }
    );
  },
  count(params) {
    const url = "/class/count";
    return axiosClient.get(
      url,
      { params },
      {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      }
    );
  },
  get(Id) {
    const url = `/class/${Id}`;
    return axiosClient.get(url);
  },
  update(data, params) {
    const url = "/class/update";
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
    const url = "/class/lock";
    return axiosClient.get(
      url,
      { params },
      {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      }
    );
  },
  unlock(params) {
    const url = "/class/unlock";
    return axiosClient.get(
      url,
      { params },
      {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      }
    );
  },

  add(data) {
    const url = "/class/add";
    return axiosClient.post(url, data, {
      headers: { "X-Requested-With": "XMLHttpRequest" },
    });
  },
  import(data) {
    const url = "/class/import";
    return axiosClient.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-Requested-With": "XMLHttpRequest",
      },
    });
  },
  getOte() {
    const url = "/ote/get-class-ote";
    return axiosClient.get(url, {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    });
  },
  updateOte(data) {
    const url = "/ote/update-class-ote";
    return axiosClient.post(url, data, {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    });
  },
  getAllSubjectId(params) {
    const url = "/subject/get-all-subject-id";
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
  getAllSemester() {
    const url = "/ote/get-list-semester";
    return axiosClient.get(url, {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    });
  },
  getLikeId(params, id) {
    const url = `/class/get-like-id/${id}`;
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
  countLikeId(id) {
    const url = `/class/count-like-id/${id}`;
    return axiosClient.get(url, {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    });
  },
  getSemesterRegister() {
    const url = "/ote/get-semester-class-register";
    return axiosClient.get(url, {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    });
  },
  updateSemesterRegister(params) {
    const url = "/ote/update-semester-class-register";
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

export default classApi;
