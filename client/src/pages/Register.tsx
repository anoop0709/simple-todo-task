import InputForm from '../components/elements/InputForm';

export const Register = () => {
    const initialValues = {
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
    };
    return (
        <InputForm
            initialValues={initialValues}
            formFor="register"
        />
    );
};
