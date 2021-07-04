import express from 'express';
import { configureDatabase } from './database';
import { configureRoutes } from './routes';

const port = 3000;
const app = express();

configureRoutes(app);

Promise.all([
    configureDatabase(),
]).then(() => {
    app.listen(port, () => {
        console.log(`API server started on port ${port}`);
    })
})
