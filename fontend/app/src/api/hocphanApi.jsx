import axiosClient from "./axiosClient";

const hocphanApi = {
  getAll(params) {
    const url = "/api/product";
    return axiosClient.get(url, {
      params,
      headers: { "X-Requested-With": "XMLHttpRequest" },
    });
  },
  get(id) {
    const url = `/api/product/${id}`;
    return axiosClient.get(url, {
      headers: { "X-Requested-With": "XMLHttpRequest" },
    });
  },
  add(data) {
    const url = `/api/product`;
    return axiosClient.post(url, data, {
      headers: { "X-Requested-With": "XMLHttpRequest" },
    });
  },
  update(data) {
    const url = `/api/product/${data.id}`;
    return axiosClient.put(url, data, {
      headers: { "X-Requested-With": "XMLHttpRequest" },
    });
  },
  remove(id) {
    const url = `/api/product/${id}`;
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

export default hocphanApi;
