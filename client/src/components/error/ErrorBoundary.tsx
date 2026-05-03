import React, { Component, type ReactNode } from 'react';
import { Box, Button } from '@mui/material';
import NOT_FOUND_IMAGE from '../../assets/404_image.jpeg'

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

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        console.error('ErrorBoundary caught:', error, info);
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <Box
                    sx={{
                        height: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 10,
                    }}
                >
                    <Box
                        component="img"
                        src={NOT_FOUND_IMAGE}
                        alt="404 Page not found"
                        sx={{
                            display: { xs: 'none', md: 'block' },
                            width: '25%',
                        }}
                    />

                    <Button
                        variant="contained"
                        onClick={this.handleReload}
                    >
                        Reload
                    </Button>
                </Box>
            );
        }

        return this.props.children;
    }
}
