import axiosClient from "./axiosClient";

const subjectApi = {
  getAll(params) {
    const url = "/api/subject";
    return axiosClient.get(url, {
      params,
      headers: { "X-Requested-With": "XMLHttpRequest" },
    });
  },
  get(id) {
    const url = `/api/subject/${id}`;
    return axiosClient.get(url, {
      headers: { "X-Requested-With": "XMLHttpRequest" },
    });
  },
  add(data) {
    const url = `/api/subject`;
    return axiosClient.post(url, data, {
      headers: { "X-Requested-With": "XMLHttpRequest" },
    });
  },
  update(data) {
    const url = `/api/subject/${data.id}`;
    return axiosClient.put(url, data, {
      headers: { "X-Requested-With": "XMLHttpRequest" },
    });
  },
  remove(id) {
    const url = `/api/subject/${id}`;
    return axiosClient.delete(url, {
      headers: { "X-Requested-With": "XMLHttpRequest" },
    });
  },
  uploadfile(data) {
    const url = "/api/uploadFile";
    return axiosClient.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-Requested-With": "XMLHttpRequest",
      },
    });
  },
  downloadFile(file) {
    const url = `/api/downloadFile/${file}`;
    return axiosClient.get(url, file, {
      headers: { "X-Requested-With": "XMLHttpRequest" },
    });
  },
};

export default subjectApi;
