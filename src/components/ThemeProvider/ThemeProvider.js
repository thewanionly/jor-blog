'use client';

import React from 'react';
import Cookie from 'js-cookie';

import { COLOR_THEME_COOKIE_NAME } from '@/constants';

const ThemeContext = React.createContext();

function ThemeProvider({ initialTheme = 'dark', children }) {
  const [theme, setTheme] = React.useState(initialTheme); //  'light' or 'dark'

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';

    setTheme(nextTheme);

    Cookie.set(COLOR_THEME_COOKIE_NAME, nextTheme, {
      expires: 1000
    });
  };

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
