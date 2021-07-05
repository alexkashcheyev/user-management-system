import { UserList } from './UserList'
import * as usersApi from '../../api/users-api';
import { aRandomUser } from '../../test-util';
import { User } from '../../api/users-api';
import { render, waitFor, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

function randomUsers(count: number): User[] {
    const res = [];
    for (let i = 0; i < count; i++) {
        res.push(aRandomUser({}))
    }
    return res;
}

function mockUseListUsers(value = randomUsers(15)) {
    jest.spyOn(usersApi, 'listUsers').mockResolvedValue({
        data: value
    } as any);

    return { users: value }
}

describe('User list', () => {
    it('Should render empty state if no users were received', async () => {
        mockUseListUsers([]);
        render(<UserList />);

        await waitFor(() => {
            expect(screen.getByTestId('empty-state')).toBeVisible();
        })
    });

    it('Should render user emails if users were received', async () => {
        const { users } = mockUseListUsers();

        users.forEach(user => {
            expect(screen.getByText(user.email)).toBeVisible();
        })
    });

    it('should load more users if load more button was clicked', async () => {
        const { users } = mockUseListUsers();


    })
})