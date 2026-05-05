import type { SxProps, Theme } from '@mui/material';

export const styles: Record<string, SxProps<Theme>> = {
  modalBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: 400, xl: '50%' },
    bgcolor: 'background.paper',
    borderRadius: '5px',
    boxShadow: 'none',
    p: 3,
  },

  title: {
    mb: 2,
  },

  actions: {
    mt: 3,
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 1,
  },

  cancelButton: {
    color: '#878787',
    textTransform: 'none',
  },

  submitButton: {
    color: '#fff',
    textTransform: 'none',
    fontWeight: 600,
  },
};