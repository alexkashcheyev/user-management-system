import { Express } from 'express';
import { createUser } from './business/create-user';
import { buildUserLink } from './business/build-user-link';

export function configureRoutes(app: Express) {

    app.post('/users', async (req, res) => {
        try {
            const user = await createUser(req.body);
            const id = user.getDataValue('id');
            res
                .status(201)
                .header('Location', buildUserLink(req,  {id}))
                .send();
        } catch {
            res.status(401).send();
        }
    })
}