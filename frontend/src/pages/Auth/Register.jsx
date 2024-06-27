import FormRegister from "../../components/Forms/FormRegister";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import Alert from "../../components/Alert/Alert.jsx";

const Register = () => {

    const { register } = useAuth()

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

    return (
        <section className="container">
            {alertOpen && <Alert errors={registerError?.message} closeAlert={() => setAlertOpen(false)} />}

            <h1 className="text-center mb-4">Registrati</h1>
            <FormRegister submitForm={handleRegister} />

        </section>
    )
}

export default Register;