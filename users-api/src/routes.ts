import { Express } from 'express';
import { createUser } from './business/create-user';
import { buildUserLink } from './business/build-user-link';
import { getUser } from './business/get-user';
import { deleteUser } from './business/delete-user';
import { updateUser } from './business/update-user';
import { listUsers } from './business/list-users';

const DEFAULT_LIMIT = 15;
const DEFAULT_OFFSET = 0;


export function configureRoutes(app: Express) {

    app.post('/users', async (req, res) => {
        if (!req.body.email || !req.body.password) {
            res.status(401).send();
        } else {
            const user = await createUser(req.body);
            const id = user.getDataValue('id');
            res
                .status(201)
                .header('Location', buildUserLink(req, { id }))
                .send();
        }
    });

    app.get('/users/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        const user = await getUser(id);

        if (user) {
            res.send(user);
        } else {
            res.status(404).send();
        }
    });

    app.delete('/users/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        const user = await getUser(id);
        if (!user) {
            res.status(404).send();
        } else {
            await deleteUser(user);
            res.status(204).send();
        }
    });

    app.put('/users/:id', async (req, res) => {
        if (!req.body.email || !req.body.password) {
            res.status(401).send();
        } else {
            const id = parseInt(req.params.id);
            const user = await getUser(id);

            if (!user) {
                res.status(404).send();
            } else {
                res.send(await updateUser(user, req.body))
            }
        }
    });

    app.get('/users', async (req, res) => {
        const limit = parseInt(req.query.limit as string);
        const offset = parseInt(req.query.offset as string);

        const users = await listUsers({
            limit: limit ? limit : DEFAULT_LIMIT,
            offset: offset ? offset : DEFAULT_OFFSET
        });

        if (users.length) {
            res.send(users);
        } else {
            res.status(404).send();
        }
    })
}