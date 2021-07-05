import { User } from "../database/model/user";
import { encryptPassword } from "./encrypt-password";

export async function createUser({
    firstName,
    lastName,
    email,
    password,
    description
}: {
    firstName?: string,
    lastName?: string,
    email: string,
    password: string,
    description?: string
}) {
    const user = User.build({
        firstName,
        lastName,
        email,
        password: encryptPassword(password),
        description
    });

    await user.save();

    return user;
}