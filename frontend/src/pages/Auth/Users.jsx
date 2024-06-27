import { useEffect, useState } from "react";
import axios from '../../utils/axiosClient.js';
import UserCard from "../../components/Cards/UserCard.jsx";

const Users = () => {

    const [users, setUsers] = useState();

    const fetchUsers = async () => {
        const res = await axios.get('/auth/users');
        setUsers(res.data);
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    return (
        <section className="container">
            <h1 className="text-center">Utenti</h1>
            <div className="row my-4 g-4">
                {users?.map((user, index) => (
                    <div key={`user-${index}`} className="col-3">
                        <UserCard user={user} />
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Users;