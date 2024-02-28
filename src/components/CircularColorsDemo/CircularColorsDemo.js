'use client';

import React from 'react';
import clsx from 'clsx';
import { Play, Pause, RotateCcw } from 'react-feather';
import { motion } from 'framer-motion';

import Card from '@/components/Card';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './CircularColorsDemo.module.css';

const COLORS = [
  { label: 'red', value: 'hsl(348deg 100% 60%)' },
  { label: 'yellow', value: 'hsl(50deg 100% 55%)' },
  { label: 'blue', value: 'hsl(235deg 100% 65%)' }
];

const ONE_SECOND_IN_MS = 1000;

function CircularColorsDemo() {
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const timerId = React.useRef();
  const componentId = React.useId();

  const selectedColor = COLORS[timeElapsed % COLORS.length];

  React.useEffect(() => {
    return () => {
      if (timerId.current) {
        clearInterval(timerId.current);
      }
    };
  }, []);

  const handlePlay = React.useCallback(() => {
    setIsPlaying(true);
    setTimeElapsed((currentTimeElapsed) => currentTimeElapsed + 1);

    const intervalId = setInterval(() => {
      setTimeElapsed((currentTimeElapsed) => currentTimeElapsed + 1);
    }, ONE_SECOND_IN_MS);

    timerId.current = intervalId;
  }, []);

  const handlePause = React.useCallback(() => {
    setIsPlaying(false);

    clearInterval(timerId.current);
  }, []);

  const handleReset = React.useCallback(() => {
    setIsPlaying(false);
    setTimeElapsed(0);

    clearInterval(timerId.current);
  }, []);

  return (
    <Card as='section' className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value;

          return (
            <li className={styles.color} key={index}>
              {isSelected && (
                <motion.div
                  layoutId={`${componentId}-selected-color-outline`}
                  className={styles.selectedColorOutline}
                />
              )}
              <div
                className={clsx(styles.colorBox, isSelected && styles.selectedColorBox)}
                style={{
                  backgroundColor: color.value
                }}
              >
                <VisuallyHidden>{color.label}</VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          <button onClick={isPlaying ? handlePause : handlePlay}>
            {isPlaying ? <Pause /> : <Play />}
            <VisuallyHidden>{isPlaying ? 'Pause' : 'Play'}</VisuallyHidden>
          </button>
          <button onClick={handleReset}>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
