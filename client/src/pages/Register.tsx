import InputForm from '../components/elements/input-form/InputForm';

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
