import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import {
    Box,
    Button,
    Checkbox,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import { validateInput } from '../utils/helper';
import { useSnackbar } from '../hooks/useSnackbar';
import { handleError } from '../services/errorHandler';
import { useForm } from '../hooks/useForm';

type LoginForm = {
    email: string;
    password: string;
};

export default function Login() {
    const { login, refetch } = useAuth();
    const { showSnackbar } = useSnackbar();

    const [showPassword, setShowPassword] = useState(false);
    const [checked, setChecked] = useState(false);

    const { handleSubmit, getTextFieldProps } = useForm<LoginForm>({
        initialValues: {
            email: '',
            password: '',
        },
        validate: validateInput,
        onSubmit: async (values) => {
            try {
                const { cleanEmail, cleanPassword } = validateInput(values);

                await login({
                    variables: {
                        input: {
                            email: cleanEmail,
                            password: cleanPassword,
                        },
                    },
                });

                showSnackbar('User login successful', 'success');
                await refetch();
            } catch (error) {
                const message = handleError(error);
                showSnackbar(message, 'error');
            }
        },
    });

    return (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                justifyContent: 'space-around',
                backgroundColor: '#ffffff',
                px: 2,
                marginTop: 10,
            }}
        >
            <Box
                sx={{
                    width: { xs: '100%', sm: '420px', md: '450px' },
                    padding: { xs: '24px', md: '40px' },
                    borderRadius: '8px',
                    border: { xs: 'none', md: '0.2px solid #878787' },
                }}
            >
                <Typography
                    variant="h5"
                    sx={{ fontWeight: 900, mb: 2 }}
                >
                    Welcome !{' '}
                </Typography>

                <Typography
                    variant="h4"
                    sx={{ fontWeight: 900 }}
                >
                    Sign in to
                </Typography>

                <Typography sx={{ mb: 3, fontWeight: 600 }}>
                    get things done ✨
                </Typography>

                <Box sx={{ mb: 2 }}>
                    <Typography>Enter your email</Typography>
                    <TextField
                        fullWidth
                        placeholder="yours@example.com"
                        {...getTextFieldProps('email')}
                    />
                </Box>

                <Box sx={{ mb: 2 }}>
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
                                                setShowPassword((p) => !p)
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

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mt: 2,
                        mb: 3,
                    }}
                >
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Checkbox
                            checked={checked}
                            onChange={(e) => setChecked(e.target.checked)}
                            sx={{ p: 0 }}
                        />
                        <Typography sx={{ color: '#878787' }}>
                            Remember me
                        </Typography>
                    </Box>

                    <Link
                        to="/login"
                        style={{
                            color: '#00C495',
                            fontWeight: 800,
                            fontSize: '14px',
                            textDecoration: 'none',
                        }}
                    >
                        Forgot Password?
                    </Link>
                </Box>

                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleSubmit}
                    sx={{
                        height: 48,
                        borderRadius: '5px',
                        textTransform: 'none',
                        fontWeight: 600,
                    }}
                >
                    Login
                </Button>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Typography sx={{ color: '#878787' }}>
                        Don't have an Account?
                    </Typography>

                    <Link
                        to="/register"
                        style={{
                            color: '#00C495',
                            fontWeight: 800,
                            marginLeft: '6px',
                            textDecoration: 'none',
                        }}
                    >
                        Register
                    </Link>
                </Box>
            </Box>

            <Box
                component="img"
                src="src/assets/todo_list.png"
                alt="login"
                sx={{
                    display: { xs: 'none', md: 'block' },
                    width: '25%',
                }}
            />
        </Box>
    );
}
