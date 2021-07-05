import axios from "axios";

const apiRoot = 'http://localhost:5000'

export interface User {
    id?: number;
    firstName?: string;
    lastName?: string;
    email: string
    password: string;
    description?: string;
}

export const createUser =
    (user: User) => axios.post(`${apiRoot}/users`, user);

export const getUser =
    (id: number) => axios.get(`${apiRoot}/users/${id}`);

export const deleteUser =
    (id: number) => axios.delete(`${apiRoot}/users/${id}`);

export const updateUser =
    (id: number, user: User) => axios.put(`${apiRoot}/users/${id}}`, user);

export const listUsers =
    (offset: number = 0, limit: number = 15) => axios.get(`${apiRoot}/users?offset=${offset}&limit=${limit}`);