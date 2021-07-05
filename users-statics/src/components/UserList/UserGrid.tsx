import { User } from "../../api/users-api";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'

interface UserGridProps {
    users: User[];
}

export function UserGrid({ users }: UserGridProps) {
    return <TableContainer>
        <Table>
            <TableHead>
                <TableCell>
                    ID
                </TableCell>
                <TableCell>
                    Email
                </TableCell>
                <TableCell>
                    Password hash
                </TableCell>
                <TableCell>
                    First name
                </TableCell>
                <TableCell>
                    Last name
                </TableCell>
                <TableCell>
                    Description
                </TableCell>
            </TableHead>
            <TableBody>
                {
                    users.map(
                        user =>
                            <TableRow key={user.id}>
                                <TableCell>
                                    {user.id}
                                </TableCell>
                                <TableCell>
                                    {user.email}
                                </TableCell>
                                <TableCell>
                                    {user.password}
                                </TableCell>
                                <TableCell>
                                    {user.firstName}
                                </TableCell>
                                <TableCell>
                                    {user.lastName}
                                </TableCell>
                                <TableCell>
                                    {user.description}
                                </TableCell>
                                <TableCell>
                                    {user.id}
                                </TableCell>
                            </TableRow>
                    )
                }
            </TableBody>
        </Table>
    </TableContainer>
}