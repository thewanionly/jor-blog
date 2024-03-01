import React from 'react';
import clsx from 'clsx';
import { Rss } from 'react-feather';
import Link from 'next/link';

import Logo from '@/components/Logo';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './Header.module.css';
import ThemeToggle from '@/components/ThemeToggle';

function Header({ className, ...delegated }) {
  return (
    <header className={clsx(styles.wrapper, className)} {...delegated}>
      <Logo />

      <div className={styles.actions}>
        <Link href='/rss.xml' className={styles.action} target='_blank'>
          <Rss
            size='1.5rem'
            style={{
              // Optical alignment
              transform: 'translate(2px, -2px)'
            }}
          />
          <VisuallyHidden>View RSS feed</VisuallyHidden>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}

export default Header;
