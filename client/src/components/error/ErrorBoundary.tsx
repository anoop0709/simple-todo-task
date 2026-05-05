import React, { Component, type ReactNode } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { styles } from './ErrorBoundary.styles';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={styles.container}>
          <Typography variant="h4" sx={styles.title}>
            Something went wrong
          </Typography>

          <Typography sx={styles.message}>
            An unexpected error occurred. Please try refreshing the page.
          </Typography>

          <Button
            variant="contained"
            onClick={this.handleReload}
            sx={styles.button}
          >
            Reload Page
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}