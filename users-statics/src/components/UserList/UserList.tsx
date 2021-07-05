import { Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { listUsers, User } from "../../api/users-api";
import { UserGrid } from "./UserGrid";

export function UserList() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        listUsers()
            .then(res => {
                setUsers(
                    [
                        ...users,
                        ...res.data
                    ]
                );
            }).catch(() => { })
    }, [])

    return users.length
        ? <UserGrid users={users} />
        : <Typography data-testid="empty-state">Could not find any users</Typography>
}