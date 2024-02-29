'use client';

import React from 'react';

import { Sun, Moon } from 'react-feather';

import VisuallyHidden from '@/components/VisuallyHidden';

import { useThemeProvider } from '../ThemeProvider';
import styles from './ThemeToggle.module.css';

function ThemeToggle() {
  const { theme, toggleTheme } = useThemeProvider();

  return (
    <button className={styles.themeToggle} onClick={toggleTheme}>
      {theme === 'light' && <Sun size='1.5rem' />}
      {theme === 'dark' && <Moon size='1.5rem' />}
      <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
    </button>
  );
}

export default ThemeToggle;
