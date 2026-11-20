'use client';

import Link from 'next/link';
import { Button } from '@mui/material';

const BtnUrlChange = ({ btnDetails, children }) => {
  const { btnTitle, url = '', color } = btnDetails || {};

  if (children) {
    if (!url) return children;
    return (
      <Link href={url} style={{ color: 'inherit', textDecoration: 'none' }}>
        {children}
      </Link>
    );
  }

  return (
    <Button
      component={url ? Link : 'button'}
      href={url || undefined}
      variant="contained"
      color="primary"
      disabled={!url}
      sx={{
        bgcolor: color ? '#76BA1B' : undefined,
        '&:hover': { bgcolor: color ? '#65a116' : undefined },
      }}
    >
      {btnTitle || 'Explore'}
    </Button>
  );
};

export default BtnUrlChange;
