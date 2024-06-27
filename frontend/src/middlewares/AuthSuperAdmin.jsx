import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AuthSuperAdmin = ({ children }) => {

    const { user } = useAuth();

    if (!user.isSuperAdmin) return <Navigate to='/' />

    return children;
}

export default AuthSuperAdmin;