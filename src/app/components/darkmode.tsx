'use client';
import * as React from 'react';
import { useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export default function ModeToggle() {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    console.log(theme);
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    // This will help you fetch the initial theme from localStorage or set the default theme.
    console.log(window.localStorage.getItem('theme'));
    const currentTheme = window.localStorage.getItem('theme') || 'light';
    setTheme(currentTheme);
  });

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="dark:bg-gray-900 mt-4 md:mt-0"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 text-black dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
