'use client';

import ThemeProvider, { useThemeProvider } from '@/components/ThemeProvider';
import { LIGHT_TOKENS, DARK_TOKENS } from '@/constants';

const Body = ({ children }) => {
  const { theme } = useThemeProvider();

  return (
    <body data-color-theme={theme} style={theme === 'light' ? LIGHT_TOKENS : DARK_TOKENS}>
      {children}
    </body>
  );
};

export const ThemedBody = ({ initialTheme, children }) => {
  return (
    <ThemeProvider initialTheme={initialTheme}>
      <Body>{children}</Body>
    </ThemeProvider>
  );
};
