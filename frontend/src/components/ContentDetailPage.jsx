'use client';

import Link from 'next/link';
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import FacebookIcon from '@mui/icons-material/Facebook';
import { myTheme } from '@/assets/Theme/myTheme';

function formatDate(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function ContentDetailPage({ item, type, shareUrl }) {
  const isNews = type === 'news';
  const facebookShareHref = shareUrl
    ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    : '';
  const backHref = isNews ? '/news-articles' : '/moments';
  const backLabel = isNews ? 'Back to News & Articles' : 'Back to Moments';
  const date = formatDate(item.created_at);

  return (
    <Box sx={{ bgcolor: '#f8faf9', minHeight: '70vh', py: { xs: 4, md: 7 } }}>
      <Container maxWidth="md">
        <Button
          component={Link}
          href={backHref}
          startIcon={<ArrowBackRoundedIcon />}
          sx={{ mb: 2.5, textTransform: 'none', color: myTheme.palette.green, fontWeight: 800 }}
        >
          {backLabel}
        </Button>

        <Paper
          component="article"
          elevation={0}
          sx={{ overflow: 'hidden', borderRadius: { xs: 3, md: 5 }, boxShadow: '0 18px 55px rgba(20,60,35,.09)' }}
        >
          {item.image_url ? (
            <Box
              component="img"
              src={item.image_url}
              alt={item.title || `${isNews ? 'Article' : 'Moment'} image`}
              sx={{ width: '100%', maxHeight: 560, objectFit: 'cover', display: 'block' }}
            />
          ) : null}

          <Stack spacing={2} sx={{ p: { xs: 3, md: 5 } }}>
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" alignItems="center">
              <Chip
                size="small"
                variant="outlined"
                color="success"
                label={isNews ? item.category || 'News' : item.category || 'Moment'}
              />
              {item.tag ? <Chip size="small" label={item.tag} /> : null}
              {date ? (
                <Typography component="time" dateTime={item.created_at} variant="caption" color="text.secondary">
                  {date}
                </Typography>
              ) : null}
            </Stack>

            <Typography component="h1" sx={{ fontSize: { xs: '1.75rem', md: '3rem' }, lineHeight: 1.3, fontWeight: 900, color: myTheme.palette.textColor, overflowWrap: 'anywhere' }}>
              {item.title}
            </Typography>

            {item.excerpt ? (
              <Typography component="p" sx={{ fontSize: { xs: '1rem', md: '1.12rem' }, lineHeight: 1.8, color: myTheme.palette.miniText }}>
                {item.excerpt}
              </Typography>
            ) : null}

            <Divider />

            <Typography component="div" sx={{ whiteSpace: 'pre-line', fontSize: '1rem', lineHeight: 1.95, color: '#374151', overflowWrap: 'anywhere' }}>
              {item.content || item.excerpt || ''}
            </Typography>

            {isNews && facebookShareHref ? (
              <>
                <Divider />
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={1.5}
                  sx={{ alignItems: { xs: 'stretch', sm: 'center' } }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 700, color: myTheme.palette.textColor }}>
                    Share this article
                  </Typography>
                  <Button
                    component="a"
                    href={facebookShareHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="contained"
                    startIcon={<FacebookIcon />}
                    aria-label="Share this article on Facebook"
                    sx={{
                      bgcolor: '#1877F2',
                      color: '#fff',
                      textTransform: 'none',
                      fontWeight: 700,
                      boxShadow: 'none',
                      '&:hover': { bgcolor: '#166FE5', boxShadow: 'none' },
                    }}
                  >
                    Share on Facebook
                  </Button>
                </Stack>
              </>
            ) : null}

            {(item.location || item.year || item.source) && (
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} color="text.secondary">
                {item.location ? <Typography variant="body2">Location: {item.location}</Typography> : null}
                {item.year ? <Typography variant="body2">Year: {item.year}</Typography> : null}
                {item.source ? <Typography variant="body2">Source: {item.source}</Typography> : null}
              </Stack>
            )}
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
