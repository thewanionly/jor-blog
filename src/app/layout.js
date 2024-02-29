import React from 'react';
import { Work_Sans, Spline_Sans_Mono } from 'next/font/google';
import { cookies } from 'next/headers';
import clsx from 'clsx';

import { BLOG_TITLE, COLOR_THEME_COOKIE_NAME } from '@/constants';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReducedMotion from '@/components/ReducedMotion';

import { ThemedBody } from './layout/ThemedBody';
import './styles.css';

const mainFont = Work_Sans({
  subsets: ['latin'],
  display: 'fallback',
  weight: 'variable',
  variable: '--font-family'
});
const monoFont = Spline_Sans_Mono({
  subsets: ['latin'],
  display: 'fallback',
  weight: 'variable',
  variable: '--font-family-mono'
});

export const metadata = {
  title: BLOG_TITLE,
  description: 'A wonderful blog about JavaScript'
};

function RootLayout({ children }) {
  const savedTheme = cookies().get(COLOR_THEME_COOKIE_NAME);
  const initialTheme = savedTheme?.value;

  return (
    <ReducedMotion>
      <html lang='en' className={clsx(mainFont.variable, monoFont.variable)}>
        <ThemedBody initialTheme={initialTheme}>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemedBody>
      </html>
    </ReducedMotion>
  );
}

export default RootLayout;
