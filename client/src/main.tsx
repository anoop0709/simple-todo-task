import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { client } from './api/apolloClient.ts';
import { ApolloProvider } from '@apollo/client/react';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import App from './App';
import { theme } from './theme';
import { ThemeProvider } from '@mui/material/styles';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <App />
                </ThemeProvider>
            </BrowserRouter>
        </ApolloProvider>
    </StrictMode>,
);
