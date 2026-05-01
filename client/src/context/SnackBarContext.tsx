import { createContext } from 'react';

export type Severity = 'success' | 'error' | 'info' | 'warning';

export type SnackbarContextType = {
    showSnackbar: (message: string, severity?: Severity) => void;
};

export const SnackbarContext = createContext<SnackbarContextType | undefined>(
    undefined,
);
