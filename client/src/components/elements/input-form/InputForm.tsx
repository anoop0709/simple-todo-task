import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import TO_DO_IMAGE from '../../../assets/todo_list.png';
import { useAuth } from '../../../hooks/useAuth';
import { validateInput } from '../../../utils/helper';
import { useForm } from '../../../hooks/useForm';
import { styles } from './InputForm.styles';

type AuthFormValues = {
    email: string;
    password: string;
    name?: string;
    confirmPassword?: string;
};

type Props = {
    initialValues: AuthFormValues;
    formFor: 'login' | 'register';
};

export default function InputForm({ initialValues, formFor }: Props) {
    const { handleLogin, handleRegister } = useAuth();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const isLoginForm = formFor === 'login';

    const fn: (values: AuthFormValues) => Promise<void> = isLoginForm
        ? handleLogin
        : handleRegister;

    const { handleSubmit, getTextFieldProps } = useForm<AuthFormValues>({
        initialValues,
        validate: validateInput,
        onSubmit: fn,
    });

    return (
        <Box sx={styles.container}>
            <Box sx={styles.card}>
                <Typography
                    variant="h5"
                    sx={styles.titleSmall}
                >
                    Welcome!
                </Typography>

                <Typography
                    variant="h4"
                    sx={styles.titleMain}
                >
                    {isLoginForm ? 'Sign in to' : 'Sign up to'}
                </Typography>

                <Typography sx={styles.subtitle}>get things done ✨</Typography>

                <Box sx={styles.inputGroup}>
                    <Typography>Enter your email</Typography>
                    <TextField
                        fullWidth
                        placeholder="yours@example.com"
                        {...getTextFieldProps('email')}
                    />
                </Box>

                {!isLoginForm && (
                    <Box sx={styles.inputGroup}>
                        <Typography>Enter your user name</Typography>
                        <TextField
                            fullWidth
                            placeholder="task master"
                            {...getTextFieldProps('name')}
                        />
                    </Box>
                )}

                <Box sx={styles.inputGroup}>
                    <Typography>Enter your password</Typography>
                    <TextField
                        fullWidth
                        type={showPassword ? 'text' : 'password'}
                        {...getTextFieldProps('password')}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            color="primary"
                                            onClick={() =>
                                                setShowPassword((prev) => !prev)
                                            }
                                        >
                                            {showPassword ? (
                                                <Visibility />
                                            ) : (
                                                <VisibilityOff />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                </Box>

                {!isLoginForm && (
                    <Box sx={styles.inputGroup}>
                        <Typography>Confirm your password</Typography>
                        <TextField
                            fullWidth
                            type={showConfirmPassword ? 'text' : 'password'}
                            {...getTextFieldProps('confirmPassword')}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                color="primary"
                                                onClick={() =>
                                                    setShowConfirmPassword(
                                                        (prev) => !prev,
                                                    )
                                                }
                                            >
                                                {showConfirmPassword ? (
                                                    <Visibility />
                                                ) : (
                                                    <VisibilityOff />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                    </Box>
                )}

                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleSubmit}
                    sx={styles.button}
                >
                    {isLoginForm ? 'Login' : 'Register'}
                </Button>

                <Box sx={styles.footer}>
                    <Typography sx={styles.footerText}>
                        {isLoginForm
                            ? `Don't have an Account?`
                            : 'Already have an account?'}
                    </Typography>

                    <Link
                        to={isLoginForm ? '/register' : '/login'}
                        style={styles.link as React.CSSProperties}
                    >
                        {isLoginForm ? 'Register' : 'Login'}
                    </Link>
                </Box>
            </Box>

            <Box
                component="img"
                src={TO_DO_IMAGE}
                alt="register"
                sx={styles.image}
            />
        </Box>
    );
}
