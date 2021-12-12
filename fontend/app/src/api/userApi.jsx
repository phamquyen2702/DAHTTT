import axiosClient from "./axiosClient";

const userApi = {
    getAll(params) {
        const url = "/api/user";
        return axiosClient.get(url, { params });
    },
    get(userName) {
        const url = `/api/userOne/${userName}`;
        return axiosClient.get(url, {
            headers: { "X-Requested-With": "XMLHttpRequest" },
        });
    },
    getUser(id) {
        const url = `/api/users/${id}`;
        return axiosClient.get(url, {
            headers: { "X-Requested-With": "XMLHttpRequest" },
        });
    },
    register(data) {
        const url = "/auth/register";
        return axiosClient.post(url, data);
    },
    login(data) {
        const url = "/auth/login";
        return axiosClient.post(url, data);
    },
    update(data) {
        const url = `/api/user/${data.id}`;
        return axiosClient.put(url, data, {
            headers: { "X-Requested-With": "XMLHttpRequest" },
        });
    },
    remove(id) {
        const url = `/api/user/${id}`;
        return axiosClient.delete(url, {
            headers: { "X-Requested-With": "XMLHttpRequest" },
        });
    },
};

export default userApi;