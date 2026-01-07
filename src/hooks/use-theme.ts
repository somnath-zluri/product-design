import * as React from 'react';

export function useTheme() {
  const [theme, setTheme] = React.useState<'light' | 'dark' | 'system'>('system');

  return {
    theme,
    setTheme,
  };
}

