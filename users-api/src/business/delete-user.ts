import { User } from "../database/model/user";

export async function deleteUser(user: User) {
    await user.destroy();
}