'use client';

import { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { myTheme } from '@/assets/Theme/myTheme';

export default function ThemeRegistry({ children }) {
  const [{ cache, flush }] = useState(() => {
    const cache = createCache({ key: 'mui', prepend: true });
    cache.compat = true;

    const previousInsert = cache.insert;
    let inserted = [];

    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) inserted.push(serialized.name);
      return previousInsert(...args);
    };

    const flush = () => {
      const previous = inserted;
      inserted = [];
      return previous;
    };

    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) return null;

    let styles = '';
    for (const name of names) {
      const style = cache.inserted[name];
      if (typeof style === 'string') styles += style;
    }

    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={myTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
