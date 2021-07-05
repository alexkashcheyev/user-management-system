import { Chance } from 'chance';
import { User } from './api/users-api';
const random = new Chance();

export function aRandomUser({
    firstName = random.name(),
    lastName = random.name(),
    email = random.email(),
    password = random.string(),
    description = random.sentence()
}): User {
    return {
        firstName, lastName, email, password, description
    };
}