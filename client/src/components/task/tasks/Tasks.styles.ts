import type { SxProps, Theme } from '@mui/material';

export const styles = {
    headerContainer: {
        width: '96%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        margin: '50px auto 20px',
    },

    title: {
        fontWeight: 600,
    },

    expandIcon: {
        cursor: 'pointer',
        ml: 1,
        transition: 'transform 0.3s ease',
    },

    tableContainer: {
        width: '96%',
        margin: '0 auto',
        boxShadow: '0.1px 0.1px 0.1px 1px #e8e8e8',
    },
} satisfies Record<string, SxProps<Theme>>;