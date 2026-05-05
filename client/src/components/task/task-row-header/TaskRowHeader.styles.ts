import type { SxProps, Theme } from '@mui/material';

export const styles = {
  checkboxCell: {
    width: '5%',
    pb: 0,
    pl: 0.5,
  },

  cell: {
    pb: 0,
  },

  nameCell: {
    width: '35%',
  },

  dateCell: {
    width: '15%',
  },

  tagCell: {
    width: '15%',
  },

  noteCell: {
    width: '15%',
  },

  actionsCell: {
    width: '15%',
  },

  headerContent: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  },

  icon: {
    fontSize: 16,
    color: '#6a6969',
  },

  text: {
    fontWeight: 500,
    color: '#6a6969',
  },
} satisfies Record<string, SxProps<Theme>>;