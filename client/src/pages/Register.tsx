import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import TO_DO_IMAGE from '../assets/todo_list.png'
import { useAuth } from '../hooks/useAuth';
import { useSnackbar } from '../hooks/useSnackbar';
import { handleError } from '../services/errorHandler';
import { validateInput } from '../utils/helper';
import { useForm } from '../hooks/useForm';

export default function Register() {
    const { register, refetch } = useAuth();
    const { showSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { handleSubmit, getTextFieldProps } = useForm({
        initialValues: {
            email: '',
            name: '',
            password: '',
            confirmPassword: '',
        },
        validate: validateInput,
        onSubmit: async (values) => {
            try {
                const { cleanEmail, cleanPassword, cleanName } =
                    validateInput(values);

                await register({
                    variables: {
                        input: {
                            email: cleanEmail,
                            password: cleanPassword,
                            userName: cleanName,
                        },
                    },
                });

                showSnackbar('User registered successfully');
                await refetch();
                navigate('/');
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
                    width: { xs: '100%', sm: '420px', md: '500px' },
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
                    Sign up to
                </Typography>

                <Typography sx={{ mb: 3, fontWeight: 600 }}>
                    get things done ✨
                </Typography>

                <Box sx={{ mb: 2 }}>
                    <Typography>Enter your email</Typography>
                    <TextField
                        fullWidth
                        placeholder="Email"
                        {...getTextFieldProps('email')}
                    />
                </Box>

                <Box sx={{ mb: 2 }}>
                    <Typography>Enter your user name</Typography>
                    <TextField
                        fullWidth
                        placeholder="User name"
                        {...getTextFieldProps('name')}
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

                <Box sx={{ mb: 2 }}>
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
                    Register
                </Button>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Typography sx={{ color: '#878787' }}>
                        Already have an account?
                    </Typography>

                    <Link
                        to="/login"
                        style={{
                            color: '#00C495',
                            fontWeight: 800,
                            marginLeft: '6px',
                            textDecoration: 'none',
                        }}
                    >
                        Login
                    </Link>
                </Box>
            </Box>

            <Box
                component="img"
                src={TO_DO_IMAGE}
                alt="register"
                sx={{
                    display: { xs: 'none', md: 'block' },
                    width: '25%',
                }}
            />
        </Box>
    );
}
