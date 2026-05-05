import type { SxProps, Theme } from '@mui/material';

export const styles: Record<string, SxProps<Theme>> = {
  row: {
    cursor: 'grab',
    '&:active': { cursor: 'grabbing' },
  },

  checkboxCell: {
    width: '5%',
  },

  nameCell: {
    width: '50%',
  },

  nameText: {
    fontWeight: 500,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    maxWidth: { md: '250px', lg: '350px', xl: '400px' },
  },

  dateCell: {
    width: '18%',
  },

  tagCell: {
    width: '5%',
  },

  noteCell: {
    width: '5%',
  },

  actionsCell: {
    width: '5%',
  },

  tagChip: {
    fontWeight: 500,
    borderRadius: '5px',
  },

  noteBox: {
    display: 'flex',
    alignItems: 'center',
  },

  noteIcon: {
    fontSize: 16,
    mr: 0.5,
    color: '#878787',
  },

  actionBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },
};