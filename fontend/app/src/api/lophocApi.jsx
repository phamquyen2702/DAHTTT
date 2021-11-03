import axiosClient from "./axiosClient";

const lophocApi = {
    getAll(params) {
        const url = "/api/category";
        return axiosClient.get(url, {
            params,
            headers: { "X-Requested-With": "XMLHttpRequest" },
        });
    },
    get(id) {
        const url = `/api/category/${id}`;
        return axiosClient.get(url, {
            headers: { "X-Requested-With": "XMLHttpRequest" },
        });
    },
    add(data) {
        const url = "/api/category";
        return axiosClient.post(url, data, {
            headers: { "X-Requested-With": "XMLHttpRequest" },
        });
    },
    update(data) {
        const url = `/api/category/${data.id}`;
        return axiosClient.put(url, data, {
            headers: { "X-Requested-With": "XMLHttpRequest" },
        });
    },
    remove(id) {
        const url = `/api/category/${id}`;
        return axiosClient.delete(url, {
            headers: { "X-Requested-With": "XMLHttpRequest" },
        });
    },
};

export default lophocApi;