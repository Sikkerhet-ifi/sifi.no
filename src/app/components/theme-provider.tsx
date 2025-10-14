'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';
import { ReactNode } from 'react';

// written out for the new version of next
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute={props.attribute}
      defaultTheme={props.defaultTheme}
      enableSystem={props.enableSystem}
      disableTransitionOnChange={props.disableTransitionOnChange}
      storageKey={props.storageKey}
      themes={props.themes}
      forcedTheme={props.forcedTheme}
      enableColorScheme={props.enableColorScheme}
      nonce={props.nonce}
      value={props.value}
    >
      {children}
    </NextThemesProvider>
  ) as ReactNode;
}
