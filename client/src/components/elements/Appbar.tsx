import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { Segment } from '@mui/icons-material';
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useApolloClient } from '@apollo/client/react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const { user, logout } = useAuth();
    const isLoggedIn = !!user;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTab = useMediaQuery(theme.breakpoints.down('md'));
    const isShowMenuBar = isMobile || isTab;
    const client = useApolloClient();
    const navigate = useNavigate();
    const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(
        null,
    );
    const open = Boolean(anchorElement);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElement(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorElement(null);
    };

    const handleLogout = async (
        e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    ) => {
        handleClose();
        e.preventDefault();
        await logout();
        await client.resetStore();
        navigate('/login');
    };

    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                backgroundColor: isLoggedIn ? '#000' : '#ffffff',
                color: isLoggedIn ? '#fff' : '#000',
            }}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Typography
                    sx={{
                        fontWeight: 700,
                        color: isLoggedIn ? '#fff' : '#000',
                    }}
                >
                    Checked
                </Typography>

                {isLoggedIn && isShowMenuBar && (
                    <React.Fragment>
                        <IconButton
                            color="inherit"
                            onClick={handleMenuOpen}
                            aria-label="open menu"
                        >
                            <Segment />
                        </IconButton>

                        <Menu
                            anchorEl={anchorElement}
                            open={open}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            sx={{ padding: '0px 30px !important' }}
                        >
                            <MenuItem
                                onClick={(e) => handleLogout(e)}
                                sx={{ padding: '0px 30px !important' }}
                            >
                                Logout
                            </MenuItem>
                        </Menu>
                    </React.Fragment>
                )}
            </Toolbar>
        </AppBar>
    );
}
