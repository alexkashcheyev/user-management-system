import express from 'express';
import { configureRoutes } from './routes';

const port = 5000;
const app = express();

configureRoutes(app);

app.listen(port, () => {
    console.log(`API server started on port ${port}`);
})