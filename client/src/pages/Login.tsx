import InputForm from '../components/elements/input-form/InputForm';

export const Login = () => {
    const initialValues = { email: '', password: '' };
    return (
        <InputForm
            initialValues={initialValues}
            formFor="login"
        />
    );
};
