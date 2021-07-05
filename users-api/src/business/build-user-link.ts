import { Request } from 'express'

export function buildUserLink(req: Request, {id}: { id : number}) {
    return `${req.protocol}://${req.get('Host')}/users/${id}`;
}