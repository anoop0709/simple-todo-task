import InputForm from '../components/elements/InputForm';

export const Login = () => {
    const initialValues = { email: '', password: '' };
    return (
        <InputForm
            initialValues={initialValues}
            formFor="login"
        />
    );
};
