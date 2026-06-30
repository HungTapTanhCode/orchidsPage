import React, { createContext, useState, useMemo, useEffect, useContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export const useThemeMode = () => {
  const [mode, setMode] = useState(() => {
    try {
      return localStorage.getItem('themeMode') || 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    try { localStorage.setItem('themeMode', mode); } catch {}
  }, [mode]);

  const toggleTheme = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  return { mode, toggleTheme };
};

export const ColorModeContext = createContext({ toggleColorMode: () => {} });
export const useColorMode = () => useContext(ColorModeContext);

export const AppThemeProvider = ({ children }) => {
  const { mode, toggleTheme } = useThemeMode();

  const colorMode = useMemo(() => ({ toggleColorMode: toggleTheme, mode }), [mode, toggleTheme]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main:  '#1565c0', // Deep blue
            light: '#5e92f3',
            dark:  '#003c8f',
          },
          secondary: {
            main:  '#00b8d4', // Cyan accent
            light: '#62ebff',
            dark:  '#0088a3',
          },
          background: {
            default: mode === 'light' ? '#f0f4ff' : '#0a0f1e',
            paper:   mode === 'light' ? '#ffffff' : '#111827',
          },
          text: {
            primary:   mode === 'light' ? '#0d1b3e' : '#e8eaf6',
            secondary: mode === 'light' ? '#4a5568' : '#90a4ae',
          },
        },
        typography: {
          fontFamily: '"Outfit", "Inter", "Helvetica", "Arial", sans-serif',
          h1: { fontWeight: 800, color: mode === 'light' ? '#0d1b3e' : '#e8eaf6' },
          h2: { fontWeight: 700, color: mode === 'light' ? '#1565c0' : '#90caf9' },
          h3: { fontWeight: 700 },
          button: { textTransform: 'none', fontWeight: 600, letterSpacing: '0.5px' },
        },
        shape: { borderRadius: 20 },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: '30px',
                padding: '10px 28px',
                boxShadow: 'none',
                '&:hover': {
                  boxShadow:
                    mode === 'light'
                      ? '0 6px 20px rgba(21, 101, 192, 0.3)'
                      : '0 6px 20px rgba(0,0,0,0.5)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: '24px',
                border:
                  mode === 'light'
                    ? '1px solid rgba(21, 101, 192, 0.1)'
                    : '1px solid rgba(255,255,255,0.05)',
                boxShadow:
                  mode === 'light'
                    ? '0px 8px 30px rgba(0,0,0,0.05)'
                    : '0px 8px 30px rgba(0,0,0,0.4)',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow:
                    mode === 'light'
                      ? '0px 22px 45px rgba(21, 101, 192, 0.18)'
                      : '0px 22px 45px rgba(0,0,0,0.6)',
                },
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              root: { borderRadius: '10px', fontWeight: 600 },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
