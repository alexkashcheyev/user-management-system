import { Chance } from 'chance';
const random = new Chance();

export function aRandomUser({
    firstName= random.name(),
    lastName = random.name(),
    email = random.email(),
    password = random.string(),
    description = random.sentence()
 }) {
    return {   
        firstName, lastName, email, password, description
    };
}