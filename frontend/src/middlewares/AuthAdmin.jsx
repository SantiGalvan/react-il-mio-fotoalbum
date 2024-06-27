import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AuthAdmin = ({ children }) => {
    const { user } = useAuth();

    if (!user.isAdmin) return <Navigate to="/" />

    return children;
}

export default AuthAdmin;