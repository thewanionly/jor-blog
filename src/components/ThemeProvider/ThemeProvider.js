'use client';

import React from 'react';

const ThemeContext = React.createContext();

function ThemeProvider({ initialTheme = 'dark', children }) {
  const [theme, setTheme] = React.useState(initialTheme); //  'light' or 'dark'

  const toggleTheme = React.useCallback(
    () => setTheme((currTheme) => (currTheme === 'light' ? 'dark' : 'light')),
    []
  );

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeProvider() {
  const themeContext = React.useContext(ThemeContext);

  if (!themeContext)
    throw new Error('useThemeProvider should be used in children components of ThemeProvider');

  return themeContext;
}

export default ThemeProvider;
