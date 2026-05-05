import type { SxProps, Theme } from '@mui/material';

export const styles: Record<string, SxProps<Theme>> = {
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    px: 2,
    mt: 10,
  },

  card: {
    width: { xs: '100%', sm: '420px', md: '500px' },
    p: { xs: '24px', md: '40px' },
    borderRadius: '8px',
    border: { xs: 'none', md: '0.2px solid #878787' },
  },

  titleSmall: {
    fontWeight: 900,
    mb: 2,
  },

  titleMain: {
    fontWeight: 900,
  },

  subtitle: {
    mb: 3,
    fontWeight: 600,
  },

  inputGroup: {
    mb: 2,
  },

  button: {
    height: 48,
    borderRadius: '5px',
    textTransform: 'none',
    fontWeight: 600,
    color: '#fff',
  },

  footer: {
    display: 'flex',
    justifyContent: 'center',
    mt: 2,
  },

  footerText: {
    color: '#878787',
  },

  link: {
    color: '#00C495',
    fontWeight: 800,
    marginLeft: '6px',
    textDecoration: 'none',
  },

  image: {
    display: { xs: 'none', md: 'block' },
    width: '25%',
  },
};