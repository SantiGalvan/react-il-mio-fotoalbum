import { useEffect, useState } from "react";
import axios from '../../utils/axiosClient.js';
import UserCard from "../../components/Cards/UserCard.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { RxReset } from "react-icons/rx";
import Toast from "../../components/Toast/Toast.jsx";

const Users = () => {

    const { user } = useAuth();

    const [users, setUsers] = useState();
    const [deleteMode, setDeleteMode] = useState(false);
    const [userToDelete, setUserToDelete] = useState();
    const [userToSwitch, setUserToSwitch] = useState();

    const fetchUsers = async () => {
        const res = await axios.get('/auth/users');
        setUsers(res.data);
    }

    const userEmail = (email) => {
        setDeleteMode(true);
        const user = users.filter(user => user.email === email);
        setUserToDelete(user);
    }

    const deleteUser = async () => {
        const res = await axios.delete(`auth/users/${userToDelete[0].email}`);

        fetchUsers();

        setDeleteMode(false);
    }

    const switchRole = async (role, email) => {

        const user = users.filter(user => user.email === email);

        const res = await axios.patch(`auth/users/${user[0].email}`, { isAdmin: role });

        if (res.status < 400) {
            fetchUsers();
            setUserToSwitch(user);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {

        const timeout = setTimeout(() => {
            setUserToSwitch(null);
        }, 3000);

        return () => {
            clearTimeout(timeout);
        }

    }, [userToSwitch]);

    return (
        <section className="container">
            <h1 className="text-center title">Utenti</h1>

            {users && <div className="row my-4 g-4">

                {users?.map((user, index) => (
                    <div key={`user-${index}`} className="col-3">
                        <UserCard
                            onDelete={userEmail}
                            user={user}
                            changeSwitch={switchRole}
                        />
                    </div>
                ))}

            </div>}

            {deleteMode &&
                <Modal
                    isShow={deleteMode}
                    closeModal={() => setDeleteMode(false)}
                    user={userToDelete}
                    userLogged={user}
                    deleteMode={true}
                    clickDelete={deleteUser}
                />}


            <Toast
                user={userToSwitch}
                closeToast={() => setUserToSwitch(null)}
            />

        </section>
    )
}

export default Users;