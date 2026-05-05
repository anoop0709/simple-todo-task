import type { SxProps, Theme } from '@mui/material';

export const styles: Record<string, SxProps<Theme>> = {
  container: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    px: 2,
  },

  title: {
    fontWeight: 700,
    mb: 2,
  },

  message: {
    color: '#666',
    mb: 3,
  },

  button: {
    textTransform: 'none',
    fontWeight: 600,
  },
};