import { Express, json } from "express"
import cors from 'cors'

export function configureMiddleware(app: Express) {
    app.use(json());
    app.use(cors())
}