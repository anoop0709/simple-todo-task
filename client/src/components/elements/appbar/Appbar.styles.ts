import type { SxProps, Theme } from '@mui/material';

export const styles: Record<string, SxProps<Theme>> = {
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  title: {
    fontWeight: 700,
  },

  menu: {
    '& .MuiPaper-root': {
      px: 3,
    },
  },

  menuItem: {
    px: 3,
  },
};