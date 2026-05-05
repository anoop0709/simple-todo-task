import type { SxProps, Theme } from '@mui/material';

export const styles: Record<string, SxProps<Theme>> = {
  modalBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: 400 },
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 3,
  },

  title: {
    mb: 2,
    fontWeight: 600,
  },

  message: {
    mt: 2,
    mb: 3,
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

  deleteButton: {
    color: '#fff',
    textTransform: 'none',
    fontWeight: 600,
  },
};