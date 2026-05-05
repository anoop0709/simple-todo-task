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

    listContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
    },

    card: {
        p: 2,
        borderRadius: '8px',
        border: '1px solid #E0E0E0',
        display: 'flex',
        gap: 1.5,
        alignItems: 'flex-start',
    },

    content: {
        flex: 1,
    },

    titleText: {
        fontWeight: 500,
    },

    secondaryText: {
        color: '#666',
        mt: 0.5,
    },

    chip: {
        mt: 1,
        width: 'fit-content',
        borderRadius: '5px',
    },
} satisfies Record<string, SxProps<Theme>>;