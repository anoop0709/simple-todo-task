import type { SxProps, Theme } from '@mui/material';

export const styles: Record<string, SxProps<Theme>> = {
    container: {
        width: '100%',
        p: { xs: '0px', md: '24px 32px' },
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        bgcolor: '#ffffff',
    },

    title: {
        color: '#000',
        fontSize: { xs: '24px', md: '32px' },
        fontWeight: 900,
    },

    rightSection: {
        display: 'flex',
        alignItems: 'center',
        gap: 2,
    },

    searchField: {
        display: {
            xs: 'none',
            sm: 'none',
            md: 'inline-flex',
        },
        bgcolor: '#fff',
        borderRadius: '5px',
        width: { xs: '140px', md: '220px' },

        '& .MuiInputBase-input::placeholder': {
            color: '#1E1E1E',
            opacity: 1,
        },
    },

    logoutButton: {
        display: {
            xs: 'none',
            sm: 'none',
            md: 'inline-flex',
        },
        color: '#000',
        borderColor: '#000',
        textTransform: 'none',
        borderRadius: '5px',

        '&:hover': {
            borderColor: '#565656',
            bgcolor: 'rgba(255,255,255,0.1)',
        },
    },

    bottomContainer: {
        width: '100%',
        p: { xs: '20px 0px', md: '24px 32px' },
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        bgcolor: '#ffffff',
    },

    addButton: {
        height: 48,
        borderRadius: '5px',
        textTransform: 'none',
        fontWeight: 600,
        boxShadow: 'none',
        color: '#fff',
        px: { xs: '25px' },
    },
};