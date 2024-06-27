import { useAuth } from "../../contexts/AuthContext";

const Dashboard = () => {

    const { user, logout } = useAuth();

    return (
        <section className="container">
            <h1 className="text-center mb-4">Dashboard</h1>
            <div className="card p-4">
                <h3 className="text-center">Benvenuto {user.name}</h3>
                <div className="row text-center my-4">
                    <div className="col-3">Foto</div>
                    <div className="col-3">Categorie</div>
                    <div className="col-3">Users</div>
                    <div className="col-3">
                        <button onClick={logout} className="btn btn-danger">Logout</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Dashboard;