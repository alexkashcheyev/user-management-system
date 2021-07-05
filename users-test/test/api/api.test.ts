import axios, { AxiosError } from 'axios'
import { API_URL_ROOT } from '../util/consts';
import { aRandomUser } from '../util/user-builders';
import { ApiDriver } from './api.driver';

function getIdFromLink(link: string) {
    return parseInt(
        link
            .split('/')
            .slice(-1)[0]
    );
}

describe('API', () => {
    const {
        createUser,
        getUser,
        deleteUser,
        updateUser
    } = ApiDriver(API_URL_ROOT);

    describe('POST /users', () => {

        it('should create a user', async () => {
            const res = await createUser();

            expect(res?.status).toEqual(201);
            expect(res?.headers['location']).toBeTruthy();
        });

        it('should return 401 Bad Request if no email  was given', async () => {
            try {
                await createUser({ email: null })
            } catch (error) {
                expect((error as AxiosError).response?.status).toEqual(401)
            }
        });

        it('should return 401 Bad Request if no password  was given', async () => {
            try {
                await createUser({ password: null })
            } catch (error) {
                expect((error as AxiosError).response?.status).toEqual(401)
            }
        });
    });

    describe('GET /users/:id', () => {
        it('should return a previously saved user', async () => {
            const user = aRandomUser({});
            const saveUserResponse = await createUser(user);
            const savedId = getIdFromLink(saveUserResponse.headers.location);
            const getUserResponse = await getUser(savedId);

            expect(
                getUserResponse?.data
            ).toEqual(
                expect.objectContaining(user)
            );
        });

        it('should respond with 404 for deleted user', async () => {
            const user = aRandomUser({});
            const saveUserResponse = await createUser(user);
            const savedId = getIdFromLink(saveUserResponse.headers.location);
            await deleteUser(savedId);

            try {
                await getUser(savedId);
            } catch (error) {
                expect((error as AxiosError).response?.status).toEqual(404);
            }
        });
    });

    describe('DELETE /users/:id', () => {
        it('should return 404 on deleted user', async () => {
            const user = aRandomUser({});
            const saveUserResponse = await createUser(user);
            const savedId = getIdFromLink(saveUserResponse.headers.location);
            await deleteUser(savedId);
            console.log('here');

            try {
                await deleteUser(savedId);
            } catch (error) {
                expect((error as AxiosError).response?.status).toEqual(404);
            }
        });

        it('should return 204 on existing user', async () => {
            const user = aRandomUser({});
            const saveUserResponse = await createUser(user);
            const savedId = getIdFromLink(saveUserResponse.headers.location);
            const deleteUserResponse = await deleteUser(savedId);

            expect(deleteUserResponse.status).toEqual(204);
        });
    });

    describe('PUT /users/:id', () => {
        it('should update saved user', async () => {
            const oldUser = aRandomUser({});
            const newUser = aRandomUser({});

            const saveUserResponse = await createUser(oldUser);
            const savedId = getIdFromLink(saveUserResponse.headers.location);

            await updateUser(savedId, newUser);

            const getUserResponse = await getUser(savedId);

            expect(
                getUserResponse.data
            ).toEqual(
                expect.objectContaining(newUser)
            )
        });

        it('should return 404 for deleted user', async () => {
            const saveUserResponse = await createUser();
            const savedId = getIdFromLink(saveUserResponse.headers.location);

            await deleteUser(savedId);

            try {
                await updateUser(savedId);
            } catch (error) {
                expect((error as AxiosError).response?.status).toEqual(404);
            }
        });

        it('should return 401 if email is empty', async () => {
            const saveUserResponse = await createUser();
            const savedId = getIdFromLink(saveUserResponse.headers.location);

            try {
                await updateUser(savedId, { email: null });
            } catch (error) {
                expect((error as AxiosError).response?.status).toEqual(401);
            }
        });

        it('should return 401 if password is empty', async () => {
            const saveUserResponse = await createUser();
            const savedId = getIdFromLink(saveUserResponse.headers.location);

            try {
                await updateUser(savedId, { password: null });
            } catch (error) {
                expect((error as AxiosError).response?.status).toEqual(401);
            }
        })
    })
})