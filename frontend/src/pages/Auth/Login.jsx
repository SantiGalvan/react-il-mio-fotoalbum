import FormLogin from "../../components/Forms/FormLogin";
import Alert from "../../components/Alert/Alert";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useMessage } from "../../contexts/MessageContext";

const Login = () => {

    const { login } = useAuth();

    const { setUserMessage } = useMessage();

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

    useEffect(() => {
        setUserMessage({});
    }, []);

    return (
        <section className="container">
            {alertOpen && <Alert generalError={loginError} closeAlert={() => setAlertOpen(false)} />}
            <h1 className="text-center mb-4 title">Login</h1>
            <FormLogin submitForm={handleLogin} />
        </section>
    )
}

export default Login;