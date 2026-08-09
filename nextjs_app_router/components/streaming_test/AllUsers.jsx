'use client';
import {use} from 'react';

const AllUsers = ({allUsers}) => {
    // NOTE: this will resume the promise from the server.
    // It will suspend until the data is available.
    const arr = use(allUsers);
    return (
        <>
            <h1>All users</h1>
            <ul>
                {arr.map((u,i) => <li key={i}>{u.fname} {u.lname}</li>)}
            </ul>
        </>
    )
}

export default AllUsers;