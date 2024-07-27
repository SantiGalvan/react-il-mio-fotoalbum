import FormRegister from "../../components/Forms/FormRegister";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import Alert from "../../components/Alert/Alert.jsx";
import { useMessage } from "../../contexts/MessageContext.jsx";

const Register = () => {

    const { register } = useAuth();

    const { setUserMessage } = useMessage();

    const [registerError, setRegisterError] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);

    const handleRegister = async (formData) => {
        try {

            await register(formData);

        } catch (err) {
            setRegisterError(err);
            setAlertOpen(true);
        }
    }

    useEffect(() => {
        setUserMessage({});
    }, []);

    return (
        <section className="container">
            {alertOpen && <Alert generalError={registerError} closeAlert={() => setAlertOpen(false)} />}

            <h1 className="text-center mb-4 title">Registrati</h1>
            <FormRegister submitForm={handleRegister} />

        </section>
    )
}

export default Register;