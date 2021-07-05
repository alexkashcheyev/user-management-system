import { User } from "../database/model/user";

export function listUsers({
    limit,
    offset
}: {
    limit: number,
    offset: number
}) {
    return User.findAll({ limit, offset });
}