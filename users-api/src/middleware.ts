import { Express, json } from "express"

export function configureMiddleware(app: Express) {
    app.use(json());
}