import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { client } from './services/api.ts';
import { ApolloProvider } from '@apollo/client/react';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import App from './App';
import { theme } from './theme';
import { ThemeProvider } from '@mui/material/styles';
import ErrorBoundary from './components/error/ErrorBoundary.tsx';
import { SnackbarProvider } from './context/SnackbarProvider.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <SnackbarProvider>
                        <ErrorBoundary>
                            <App />
                        </ErrorBoundary>
                    </SnackbarProvider>
                </ThemeProvider>
            </BrowserRouter>
        </ApolloProvider>
    </StrictMode>,
);
