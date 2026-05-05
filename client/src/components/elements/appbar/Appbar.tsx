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
import { useAuth } from '../../../hooks/useAuth';
import { styles } from './Appbar.styles';

export default function Header() {
    const { user, handleLogout } = useAuth();
    const isLoggedIn = !!user;

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTab = useMediaQuery(theme.breakpoints.down('md'));
    const isShowMenuBar = isMobile || isTab;

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

    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                backgroundColor: isLoggedIn ? '#000' : '#fff',
                color: isLoggedIn ? '#fff' : '#000',
            }}
        >
            <Toolbar sx={styles.toolbar}>
                <Typography
                    sx={{
                        ...styles.title,
                        color: isLoggedIn ? '#fff' : '#000',
                    }}
                >
                    Checked
                </Typography>

                {isLoggedIn && isShowMenuBar && (
                    <>
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
                            sx={styles.menu}
                        >
                            <MenuItem
                                onClick={(e) => handleLogout(e)}
                                sx={styles.menuItem}
                            >
                                Logout
                            </MenuItem>
                        </Menu>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}
