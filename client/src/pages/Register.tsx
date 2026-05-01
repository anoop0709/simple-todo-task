import { useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { useNavigate } from 'react-router-dom';
import { REGISTER } from '../graphql/mutations';
import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { validateInput } from '../utils/helper';
import { useAuth } from '../hooks/useAuth';
import { useSnackbar } from '../hooks/useSnackBar';

export default function Register() {
    const { refetch } = useAuth();
    const { showSnackbar } = useSnackbar();
    const [register] = useMutation(REGISTER);

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [touched, setTouched] = useState<{
        email?: boolean;
        name?: boolean;
        password?: boolean;
        confirmPassword?: boolean;
    }>({});

    const [errors, setErrors] = useState<{
        email?: string;
        name?: string;
        password?: string;
        confirmPassword?: string;
    }>({});

    const handleChange = (field: string, value: string) => {
        if (field === 'email') setEmail(value);
        if (field === 'name') setName(value);
        if (field === 'password') setPassword(value);
        if (field === 'confirmPassword') setConfirmPassword(value);

        const { errors } = validateInput({
            email: field === 'email' ? value : email,
            password: field === 'password' ? value : password,
            confirmPassword:
                field === 'confirmPassword' ? value : confirmPassword,
            name: field === 'name' ? value : name,
        });

        setErrors(errors);
    };

    const handleBlur = (
        field: 'email' | 'name' | 'password' | 'confirmPassword',
    ) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
    };

    const handleRegister = async () => {
        try {
            const { isValid, errors, cleanEmail, cleanPassword, cleanName } =
                validateInput({
                    email,
                    password,
                    confirmPassword,
                    name,
                });

            setErrors(errors);

            if (!isValid) return;

            await register({
                variables: {
                    email: cleanEmail,
                    password: cleanPassword,
                    userName: cleanName,
                },
            });
            showSnackbar('User registration successfull');
            await refetch();
            navigate('/');
        } catch (error) {
            console.error('Register error:', error);
            showSnackbar('Something went wrong, please try again', 'error');
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                justifyContent: 'space-around',
                backgroundColor: '#F7F7F7',
                px: 2,
            }}
        >
            <Box
                sx={{
                    width: { xs: '100%', sm: '420px', md: '500px' },
                    padding: { xs: '24px', md: '40px' },
                    borderRadius: '8px',
                    border: { xs: 'none', md: '0.2px solid #878787' },
                    boxShadow: { xs: 'none', md: 'none' },
                }}
            >
                <Box sx={{ width: '100%' }}>
                    <Typography
                        variant="h5"
                        sx={{ fontWeight: 900, marginBottom: '20px' }}
                    >
                        Welcome !
                    </Typography>

                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 900,
                            fontSize: { xs: '24px', md: '32px' },
                        }}
                    >
                        Sign up to
                    </Typography>

                    <Typography sx={{ marginBottom: '24px', fontWeight: 500 }}>
                        get things done ✨
                    </Typography>
                    <Box sx={{ marginBottom: '20px' }}>
                        <Typography>Enter your email</Typography>
                        <TextField
                            fullWidth
                            placeholder="Email"
                            value={email}
                            onChange={(e) =>
                                handleChange('email', e.target.value)
                            }
                            onBlur={() => handleBlur('email')}
                            error={touched.email && !!errors.email}
                            helperText={touched.email ? errors.email : ''}
                            sx={{
                                mb: { xs: 1.5, md: 2 },
                            }}
                        />
                    </Box>
                    <Box sx={{ marginBottom: '20px' }}>
                        <Typography>Enter your user name</Typography>
                        <TextField
                            fullWidth
                            placeholder="User name"
                            value={name}
                            onChange={(e) =>
                                handleChange('name', e.target.value)
                            }
                            onBlur={() => handleBlur('name')}
                            error={touched.name && !!errors.name}
                            helperText={touched.name ? errors.name : ''}
                            sx={{
                                mb: { xs: 1.5, md: 2 },
                            }}
                        />
                    </Box>
                    <Box sx={{ marginBottom: '20px' }}>
                        <Typography>Enter your password</Typography>
                        <TextField
                            fullWidth
                            placeholder="Password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) =>
                                handleChange('password', e.target.value)
                            }
                            onBlur={() => handleBlur('password')}
                            error={touched.password && !!errors.password}
                            helperText={touched.password ? errors.password : ''}
                            sx={{
                                mb: { xs: 1.5, md: 2 },
                            }}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                color="primary"
                                                onClick={() =>
                                                    setShowPassword(
                                                        (prev) => !prev,
                                                    )
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
                    <Box sx={{ marginBottom: '20px' }}>
                        <Typography>Confirm your password</Typography>
                        <TextField
                            fullWidth
                            placeholder="Confirm Password"
                            type={showPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) =>
                                handleChange('confirmPassword', e.target.value)
                            }
                            onBlur={() => handleBlur('confirmPassword')}
                            error={
                                touched.confirmPassword &&
                                !!errors.confirmPassword
                            }
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
                            helperText={
                                touched.confirmPassword
                                    ? errors.confirmPassword
                                    : ''
                            }
                            sx={{ mb: { xs: 1.5, md: 3 } }}
                        />
                    </Box>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleRegister}
                        sx={{
                            height: 48,
                            borderRadius: '5px',
                            textTransform: 'none',
                            fontWeight: 600,
                            boxShadow: 'none',
                        }}
                    >
                        Register
                    </Button>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '16px',
                        }}
                    >
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
            </Box>
            <Box
                component="img"
                src="src/assets/todo_list.png"
                alt="register"
                sx={{
                    display: { xs: 'none', md: 'block' },
                    width: '25%',
                    height: '25%',
                }}
            />
        </Box>
    );
}
