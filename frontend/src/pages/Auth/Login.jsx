import FormLogin from "../../components/Forms/FormLogin";
import Alert from "../../components/Alert/Alert";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {

    const { login } = useAuth();

    const [loginError, setLoginError] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);

    const handleLogin = async (formData) => {

        setLoginError(null);

        try {

            await login(formData);

        } catch (err) {

            setLoginError(err);
            setAlertOpen(true);

        }
    }

    return (
        <section className="container">
            {alertOpen && <Alert errors={loginError?.message} closeAlert={() => setAlertOpen(false)} />}
            <h1 className="text-center mb-4">Login</h1>
            <FormLogin submitForm={handleLogin} />
        </section>
    )
}

export default Login;