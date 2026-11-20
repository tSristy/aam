'use client';

import Image from 'next/image';
import { Box, Container, Stack, Typography } from '@mui/material';
import BtnUrlChange from '../Button/BtnUrlChange';

const Banner = ({ bannerHeight, text = {}, img, btnDetails, alt = 'Amzad Ali Memorial Foundation' }) => {
  const { supportTitle, mainTitle, descriptionText } = text;
  const hasImage = Boolean(img);

  return (
    <Box
      sx={{
        // Slightly shorter on phones; the full height from md up
        height: { xs: `calc(${bannerHeight} * 0.85)`, md: bannerHeight },
        minHeight: { xs: '20rem', md: 0 },
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        '& .aamf-banner-image': {
          transition: 'transform 5s ease',
        },
        '&:hover .aamf-banner-image': {
          transform: 'scale(1.08)',
        },
      }}
    >
      {hasImage ? (
        <Image
          className="aamf-banner-image"
          src={img}
          alt={alt}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      ) : null}

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(30, 30, 30, 0.6)',
          zIndex: 1,
        }}
      >
        <Container sx={{ height: '100%' }}>
          <Stack
            direction="column"
            sx={{
              height: '100%',
              py: 2,
              justifyContent: 'center',
              alignItems: btnDetails ? 'flex-start' : 'center',
              textAlign: btnDetails ? 'left' : 'center',
            }}
          >
            <Typography
              component="p"
              fontSize={{ xs: '.9rem', md: '1.12rem' }}
              sx={{ color: 'white', fontWeight: 600 }}
            >
              {supportTitle || 'EST.2007 • MYMENSINGH, BANGLADESH'}
            </Typography>

            <Typography
              component="h1"
              fontSize={{ xs: '1.75rem', sm: '2.25rem', md: '3rem' }}
              sx={{ textTransform: 'uppercase', color: 'white', fontWeight: 700, lineHeight: 1.2, my: 1 }}
            >
              {mainTitle || 'Amzad Ali Memorial Foundation'}
            </Typography>

            <Typography component="p" variant="h6" sx={{ color: 'white', fontWeight: 400, fontSize: { xs: '1rem', md: '1.25rem' } }}>
              {descriptionText || 'Serving Humanity with Compassion and Dedication.'}
            </Typography>

            {btnDetails ? (
              <Box sx={{ pt: 3 }}>
                <BtnUrlChange btnDetails={btnDetails} />
              </Box>
            ) : null}
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Banner;
