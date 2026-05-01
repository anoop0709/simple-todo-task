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
import { useSnackbar } from '../hooks/useSnackBar';

export default function Login() {
    const { login, refetch } = useAuth();
    const { showSnackbar } = useSnackbar();

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [checked, setChecked] = useState<boolean>(false);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [touched, setTouched] = useState<{
        email?: boolean;
        password?: boolean;
    }>({});

    const [errors, setErrors] = useState<{
        email?: string;
        password?: string;
    }>({});

    const handleEmailChange = (value: string) => {
        setEmail(value);

        const { errors } = validateInput({
            email: value,
            password,
        });

        setErrors(errors);
    };

    const handlePasswordChange = (value: string) => {
        setPassword(value);

        const { errors } = validateInput({
            email,
            password: value,
        });

        setErrors(errors);
    };

    const handleBlur = (field: 'email' | 'password') => {
        setTouched((prev) => ({ ...prev, [field]: true }));
    };

    const handleLogin = async () => {
        try {
            const { isValid, cleanEmail, errors, cleanPassword } =
                validateInput({
                    email,
                    password,
                });

            setErrors(errors);

            if (!isValid) return;

            await login({
                variables: {
                    email: cleanEmail,
                    password: cleanPassword,
                },
            });
            showSnackbar('user login successfull', 'success');
            await refetch();
        } catch (error) {
            console.log(error);
            showSnackbar('Something went wrong, please try again', 'error');
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

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
                    width: { xs: '100%', sm: '420px', md: '450px' },
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
                        sx={{ fontWeight: 900 }}
                    >
                        Sign in to
                    </Typography>

                    <Typography sx={{ marginBottom: '24px', fontWeight: 500 }}>
                        get things done ✨
                    </Typography>
                    <Box sx={{ marginBottom: '20px' }}>
                        <Typography>Enter your email</Typography>

                        <TextField
                            fullWidth
                            placeholder="yours@example.com"
                            value={email}
                            onChange={(e) => handleEmailChange(e.target.value)}
                            onBlur={() => handleBlur('email')}
                            error={touched.email && !!errors.email}
                            helperText={touched.email ? errors.email : ''}
                            sx={{ borderRadius: '5px' }}
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
                                handlePasswordChange(e.target.value)
                            }
                            onBlur={() => handleBlur('password')}
                            error={touched.password && !!errors.password}
                            helperText={touched.password ? errors.password : ''}
                            sx={{
                                borderRadius: '5px',
                                backgroundColor: '#F5F5F5',
                            }}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                color="primary"
                                                onClick={
                                                    handleClickShowPassword
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
                            marginTop: '20px',
                            marginBottom: '30px',
                        }}
                    >
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Checkbox
                                checked={checked}
                                onChange={handleChange}
                                sx={{ padding: 0 }}
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
                        disabled={!email || !password}
                        onClick={handleLogin}
                        sx={{
                            height: 48,
                            borderRadius: '5px',
                            textTransform: 'none',
                            fontWeight: 600,
                        }}
                    >
                        Login
                    </Button>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '16px',
                        }}
                    >
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
            </Box>

            <Box
                component="img"
                src="src/assets/todo_list.png"
                alt="login"
                sx={{
                    display: { xs: 'none', md: 'block' },
                    width: '25%',
                    height: '25%',
                }}
            />
        </Box>
    );
}
