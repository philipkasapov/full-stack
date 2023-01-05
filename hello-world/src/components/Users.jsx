import React, { useState } from 'react';
import { useEffect } from 'react';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        (async () => {
            const users = await fetch('http://localhost:4545/users/all').then(res => res.json())
            const parsedUsers = users.map(u => JSON.parse(u));
            setUsers(parsedUsers);
        })();
    }, [])

    const addUser = async (e) => {
        e.preventDefault();
        const name = e.target[0].value;
        const surname = e.target[1].value;

        const response = await fetch('http://localhost:4545/users/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, surname: surname })
        });

    }

    return (
        <>
            <div>
                <form onSubmit={addUser}>
                    <input name='name' placeholder='name'></input>
                    <input name='surname' placeholder='surname'></input>
                    <input type='submit'></input>
                </form>
            </div>
            <div>
                <span>Users</span>
                <ul>
                    {users.map((user, index) => (
                        <li key={index}>{user?.name} {user?.surname}</li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Users;