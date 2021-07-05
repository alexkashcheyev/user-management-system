import express from 'express';
import { configureDatabase } from './database';
import { configureMiddleware } from './middleware';
import { configureRoutes } from './routes';

const port = 5000;
const app = express();

configureMiddleware(app);
configureRoutes(app);

Promise.all([
    configureDatabase(),
]).then(() => {
    app.listen(port, () => {
        console.log(`API server started on port ${port}`);
    })
})
