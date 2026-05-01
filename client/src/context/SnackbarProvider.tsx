import { useState, type ReactNode } from 'react';
import AppSnackbar from '../components/elements/SnackBar';
import { SnackbarContext, type Severity } from './SnackBarContext';

export function SnackbarProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState({
        open: false,
        message: '',
        severity: 'success' as Severity,
    });

    const showSnackbar = (message: string, severity: Severity = 'success') => {
        setState({ open: true, message, severity });
    };

    const handleClose = () => {
        setState((prev) => ({ ...prev, open: false }));
    };

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}

            <AppSnackbar
                open={state.open}
                message={state.message}
                severity={state.severity}
                onClose={handleClose}
            />
        </SnackbarContext.Provider>
    );
}
