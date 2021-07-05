import { DatabaseError } from "sequelize";
import { User } from "../database/model/user";
import { encryptPassword } from "./encrypt-password";

export async function updateUser(user: User, newValues: any) {
    Object.keys(User.rawAttributes).forEach(
        field => {
            if (field !== 'id') {
                (user as any)[field] = newValues[field] ?? null
            }
        }
    );

    (user as any).password = encryptPassword(newValues.password);

    await user.save();

    return user;
}