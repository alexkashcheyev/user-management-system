import { User } from "../database/model/user";

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
    if (!password || !email) {
        throw new Error('email and password must be defined')
    }

    const user = User.build({
        firstName,
        lastName,
        email,
        password,
        description
    });

    await user.save();

    return user;
}