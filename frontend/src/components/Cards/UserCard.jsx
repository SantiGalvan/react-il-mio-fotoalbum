import { useState } from 'react';
import userCardStyle from './UserCard.module.scss';
import { FaTrashAlt } from "react-icons/fa";

const UserCard = ({ user, onDelete, changeSwitch }) => {

    const [admin, setAdmin] = useState(user.isAdmin);

    const logo = () => {
        if (user.name) {
            const logo = user.name.split('').filter(l => l !== l.toLowerCase());
            return logo;
        }
    }

    const colorLogo = () => {
        let color = '';

        if (user?.isAdmin && user.isSuperAdmin) color = 'super-admin';

        if (user?.isAdmin && !user.isSuperAdmin) color = 'admin';

        return color;
    }

    return (
        <div className={`${userCardStyle.card} card p-2`}>

            <div className="card-body text-center">

                <div className={`${userCardStyle.logo} ${colorLogo()}`}>{logo()}</div>

                <h3>{user.name}</h3>

                <div className="row">
                    <h5>Ruolo:</h5>

                    {(!user.isAdmin && !user.isSuperAdmin) && <div className="col-12 d-flex gap-2 justify-content-center">
                        <h6>User</h6>

                        <div className="mb-3 d-flex gap-2">
                            {/* <label className="form-check-label" htmlFor="visible">Foto visibile:</label> */}
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id="visible"
                                    checked={admin}
                                    onChange={(e) => {
                                        changeSwitch(e.target.checked, user.email);
                                        setAdmin(e.target.checked);
                                    }}
                                />
                            </div>
                        </div>

                    </div>}

                    {(user.isAdmin && !user.isSuperAdmin) && <div className='col-12 d-flex gap-2 justify-content-center'>
                        <h6>Admin</h6>

                        <div className="mb-3 d-flex gap-2">
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id="visible"
                                    checked={admin}
                                    onChange={(e) => {
                                        changeSwitch(e.target.checked, user.email);
                                        setAdmin(e.target.checked);
                                    }}
                                />
                            </div>
                        </div>

                    </div>}

                    {user.isSuperAdmin && <div className="col-12">
                        <h6>Super Admin</h6>
                    </div>}

                </div>

                <p className='mb-0'><strong>Email:</strong></p>
                <p>{user.email}</p>

                <div className="d-flex justify-content-center">

                    {user.isSuperAdmin ||
                        <button
                            onClick={() => onDelete(user.email)}
                            className={`${userCardStyle.btn} btn btn-sm btn-danger d-flex align-items-center gap-1`}>
                            <FaTrashAlt />Elimina
                        </button>
                    }

                </div>
            </div>

        </div>
    )
}

export default UserCard;