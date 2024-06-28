import { Link } from "react-router-dom";

const DashboardCard = ({ user, clickLogout }) => {
    return (
        <div className="card p-4">
            <h3 className="text-center">Benvenuto {user.name}</h3>

            <div className="row text-center my-5">

                <div className={!user.isSuperAdmin && !user.isAdmin ? 'col-6' : user.isAdmin && !user.isSuperAdmin ? 'col-4' : 'col-3'}>
                    <Link to={'/photos'} className="btn btn-primary">Vai alle foto</Link>
                </div>

                {user.isAdmin && <div className={!user.isSuperAdmin && !user.isAdmin ? 'col-6' : user.isAdmin && !user.isSuperAdmin ? 'col-4' : 'col-3'}>
                    <Link to={'/categories'} className="btn btn-warning">Vai alle categorie</Link>
                </div>}

                {user.isSuperAdmin && <div className="col-3">
                    <Link to={'/users'} className="btn btn-success">Vai alla lista degli utenti</Link>
                </div>}

                <div className={!user.isSuperAdmin && !user.isAdmin ? 'col-6' : user.isAdmin && !user.isSuperAdmin ? 'col-4' : 'col-3'}>
                    <button onClick={clickLogout} className="btn btn-danger">Logout</button>
                </div>

            </div>

        </div>
    )
}

export default DashboardCard;