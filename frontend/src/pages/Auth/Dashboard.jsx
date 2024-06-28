import { useAuth } from "../../contexts/AuthContext";
import DashboardCard from "../../components/Cards/DashboardCard";
import Modal from '../../components/Modal/Modal';
import { useState } from "react";

const Dashboard = () => {

    const { user, logout } = useAuth();

    const [logoutMode, setLogoutMode] = useState();

    return (
        <section className="container">
            <h1 className="text-center mb-4">Dashboard</h1>
            <DashboardCard user={user} clickLogout={() => setLogoutMode(true)} />

            {logoutMode &&
                <Modal
                    isShow={logoutMode}
                    closeModal={() => setLogoutMode(false)}
                    title={user?.name}
                    clickLogout={logout}
                />
            }

        </section>
    )
}

export default Dashboard;