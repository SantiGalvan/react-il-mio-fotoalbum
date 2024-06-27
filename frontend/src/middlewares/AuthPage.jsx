import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AuthPage = ({ children }) => {
    const { isLogged } = useAuth();

    if (!isLogged) return <Navigate to="/login/" />

    return children;
}

export default AuthPage;