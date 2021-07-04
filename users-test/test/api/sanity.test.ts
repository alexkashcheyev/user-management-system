import axios from 'axios'
import { API_URL_ROOT } from '../util/consts';
import { Chance } from 'chance'

describe('API sanity test', () => {
    const random = new Chance();
    
    it('should create a user', async () => {
        const res = await axios({
            method: 'POST',
            url: `${API_URL_ROOT}/users/`,
            data: {
                firstName: random.name(),
                lastName: random.name(),
                email: random.email(),
                password: random.word(),
                description: random.string()
            }
        });

        expect(res.status).toEqual(201);
        expect(res.headers['Location']).toBeTruthy();
    })
})