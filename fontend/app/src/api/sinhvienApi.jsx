import axiosClient from "./axiosClient";

const sinhvienApi = {
    getAll(params) {
        const url = "/order";
        return axiosClient.get(url, {
            params,
            headers: { "X-Requested-With": "XMLHttpRequest" },
        });
    },
    get(id) {
        const url = `/order/${id}`;
        return axiosClient.get(url, {
            headers: { "X-Requested-With": "XMLHttpRequest" },
        });
    },
    add(data) {
        const url = "/order";
        return axiosClient.post(url, data, {
            headers: { "X-Requested-With": "XMLHttpRequest" },
        });
    },
    update(data) {
        const url = `/order/${data.id}`;
        return axiosClient.put(url, data, {
            headers: { "X-Requested-With": "XMLHttpRequest" },
        });
    },
    remove(id) {
        const url = `/order/${id}`;
        return axiosClient.delete(url, {
            headers: { "X-Requested-With": "XMLHttpRequest" },
        });
    },
};

export default sinhvienApi;