import axios, { AxiosError } from 'axios';
import { aRandomUser } from '../util/user-builders';

export function ApiDriver(apiRoot: string) {

    const createUser =
        (user: any = {}) => axios.post(`${apiRoot}/users`, aRandomUser(user));

    const getUser =
        (id: number) => axios.get(`${apiRoot}/users/${id}`);

    const deleteUser =
        (id: number) => axios.delete(`${apiRoot}/users/${id}`);

    const updateUser =
        (id: number, user: any = {}) => axios.put(`${apiRoot}/users/${id}}`, aRandomUser(user));

    return {
        createUser,
        getUser,
        deleteUser,
        updateUser
    }
}