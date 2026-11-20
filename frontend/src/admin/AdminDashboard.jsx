'use client';

import Link from 'next/link';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import CollectionsRoundedIcon from '@mui/icons-material/CollectionsRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

const cards = [
  {
    title: 'Moments Gallery',
    text: 'Upload gallery photos, manage category-based labels, and choose the Featured Moment.',
    icon: CollectionsRoundedIcon,
    to: '/admin/moments',
    button: 'Manage Moments',
    points: ['Category filters', 'Featured Moment', 'Live preview'],
  },
  {
    title: 'News & Articles',
    text: 'Manage Top Headline, Latest Headlines and Stories from one organized workspace.',
    icon: ArticleRoundedIcon,
    to: '/admin/news',
    button: 'Manage News',
    points: ['Top Headline', 'Latest Headlines', 'Story cards'],
  },
];

export default function AdminDashboard() {
  return (
    <Stack spacing={{ xs: 2, md: 2.25 }}>
      <Paper
        elevation={0}
        sx={{
          px: { xs: 2.5, md: 3.5 },
          py: { xs: 2.5, md: 3 },
          borderRadius: 4,
          background:
            'radial-gradient(circle at top right, rgba(185,230,190,.58), transparent 34%), linear-gradient(135deg, #1b5e20, #2e7d32)',
          color: 'white',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 18px 48px rgba(27,94,32,.16)',
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: '1.7rem', md: '2.05rem' },
            fontWeight: 900,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
          }}
        >
          Welcome to AAMF CMS
        </Typography>
        <Typography
          sx={{
            mt: 0.7,
            color: 'rgba(255,255,255,.82)',
            fontSize: { xs: '.82rem', md: '.88rem' },
            letterSpacing: '.02em',
          }}
        >
          Manage website moments and editorial content from one place.
        </Typography>
      </Paper>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
          gap: { xs: 2, md: 2.25 },
          alignItems: 'stretch',
        }}
      >
        {cards.map((card) => (
          <DashboardCard key={card.title} card={card} />
        ))}
      </Box>
    </Stack>
  );
}

function DashboardCard({ card }) {
  const Icon = card.icon;

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, md: 2.4 },
        borderRadius: 4,
        minHeight: { xs: 230, md: 245 },
        width: '100%',
        border: '1px solid rgba(46,125,50,.11)',
        background:
          'linear-gradient(145deg, rgba(255,255,255,.99) 0%, rgba(249,253,250,.97) 100%)',
        boxShadow: '0 12px 34px rgba(20,60,35,.065)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform .22s ease, box-shadow .22s ease, border-color .22s ease',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: '0 auto 0 0',
          width: 4,
          bgcolor: '#2e7d32',
          opacity: 0.88,
        },
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 18px 42px rgba(20,60,35,.10)',
          borderColor: 'rgba(46,125,50,.20)',
        },
      }}
    >
      <Stack sx={{ height: '100%' }} spacing={1.5}>
        <Stack direction="row" spacing={1.35} alignItems="center">
          <Box
            sx={{
              width: 43,
              height: 43,
              borderRadius: 2.8,
              display: 'grid',
              placeItems: 'center',
              color: '#2e7d32',
              bgcolor: '#e9f6eb',
              border: '1px solid #d9ecdd',
              flexShrink: 0,
            }}
          >
            <Icon sx={{ fontSize: 23 }} />
          </Box>

          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                fontSize: { xs: '1.02rem', md: '1.08rem' },
                fontWeight: 900,
                lineHeight: 1.2,
                color: '#17231b',
              }}
            >
              {card.title}
            </Typography>
            <Typography
              sx={{
                mt: 0.25,
                fontSize: '.72rem',
                fontWeight: 700,
                color: 'rgba(27,94,32,.64)',
                textTransform: 'uppercase',
                letterSpacing: '.08em',
              }}
            >
              Content management
            </Typography>
          </Box>
        </Stack>

        <Typography
          color="text.secondary"
          sx={{
            lineHeight: 1.58,
            fontSize: { xs: '.82rem', md: '.84rem' },
            maxWidth: 640,
          }}
        >
          {card.text}
        </Typography>

        <Stack direction="row" spacing={0.7} flexWrap="wrap" useFlexGap>
          {card.points.map((point) => (
            <ChipLike key={point} text={point} />
          ))}
        </Stack>

        <Box sx={{ flex: 1, minHeight: 4 }} />

        <Button
          component={Link}
          href={card.to}
          variant="contained"
          color="success"
          endIcon={<ArrowForwardRoundedIcon sx={{ fontSize: '18px !important' }} />}
          sx={{
            alignSelf: 'flex-start',
            minHeight: 38,
            borderRadius: 999,
            px: 2.1,
            fontSize: '.78rem',
            fontWeight: 900,
            letterSpacing: '.01em',
            textTransform: 'uppercase',
            boxShadow: '0 7px 16px rgba(46,125,50,.18)',
            '&:hover': {
              boxShadow: '0 9px 20px rgba(46,125,50,.24)',
            },
          }}
        >
          {card.button}
        </Button>
      </Stack>
    </Paper>
  );
}

function ChipLike({ text }) {
  return (
    <Box
      sx={{
        px: 1.05,
        py: 0.38,
        borderRadius: 999,
        bgcolor: '#f2faf3',
        border: '1px solid #dceee0',
        color: '#1b5e20',
        fontWeight: 800,
        fontSize: '.68rem',
        lineHeight: 1.2,
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </Box>
  );
}
