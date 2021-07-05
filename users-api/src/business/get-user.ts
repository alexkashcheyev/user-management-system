import { User } from "../database/model/user";

export async function getUser(id: number) {
    return User.findByPk(id);
}