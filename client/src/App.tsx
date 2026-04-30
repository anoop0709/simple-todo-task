import './App.css';
import { Box, CircularProgress } from '@mui/material';
import { useAuth } from './hooks/useAuth';
import Login from './pages/Login';
import { Navigate, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Taskboard from './pages/Taskboard';
import Header from './components/Appbar';

export default function App() {
    const { user, loading } = useAuth();
    if (loading) {
        return (
            <Box
                sx={{
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            {user && <Header />}
            <Routes>
                {/* Public routes */}
                <Route
                    path="/login"
                    element={!user ? <Login /> : <Navigate to="/" />}
                />
                <Route
                    path="/register"
                    element={!user ? <Register /> : <Navigate to="/" />}
                />
                <Route
                    path="/"
                    element={user ? <Taskboard /> : <Navigate to="/login" />}
                />
                <Route
                    path="*"
                    element={<Navigate to="/" />}
                />
            </Routes>
        </>
    );
}
