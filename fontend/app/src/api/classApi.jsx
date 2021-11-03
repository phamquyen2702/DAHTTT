import axiosClient from "./axiosClient";

const classApi = {
    getAll(params) {
        const url = "/api/class";
        return axiosClient.get(url, {
            params,
            headers: { "X-Requested-With": "XMLHttpRequest" },
        });
    },
    get(id) {
        const url = `/api/class/${id}`;
        return axiosClient.get(url, {
            headers: { "X-Requested-With": "XMLHttpRequest" },
        });
    },
    add(data) {
        const url = "/api/class";
        return axiosClient.post(url, data, {
            headers: { "X-Requested-With": "XMLHttpRequest" },
        });
    },
    update(data) {
        const url = `/api/class/${data.id}`;
        return axiosClient.put(url, data, {
            headers: { "X-Requested-With": "XMLHttpRequest" },
        });
    },
    remove(id) {
        const url = `/api/class/${id}`;
        return axiosClient.delete(url, {
            headers: { "X-Requested-With": "XMLHttpRequest" },
        });
    },
};

export default classApi;