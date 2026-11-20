'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

export default function AdminLogin() {
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: 'admin@aamf.org', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(form.email, form.password);
      router.replace('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      sx={{
        background:
          'radial-gradient(circle at top left, rgba(46,125,50,.16), transparent 35%), linear-gradient(135deg, #f7fbf8 0%, #eef7f0 100%)'
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={0} sx={{ p: { xs: 3, sm: 5 }, borderRadius: 5, boxShadow: '0 24px 80px rgba(20,60,35,.12)' }}>
          <Stack spacing={3} component="form" onSubmit={handleSubmit}>
            <Box>
              <Typography variant="overline" color="success.main" fontWeight={800}>
                AAMF CMS
              </Typography>
              <Typography variant="h4" fontWeight={900} color="text.primary">
                Admin Login
              </Typography>
              <Typography color="text.secondary" mt={1}>
                Manage Moments, News & Articles.
              </Typography>
            </Box>

            {error && <Alert severity="error">{error}</Alert>}

            <TextField
              label="Email address"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              fullWidth
              required
            />
            <Button type="submit" size="large" variant="contained" disabled={submitting} sx={{ py: 1.4, borderRadius: 3 }}>
              {submitting ? 'Signing in...' : 'Sign in'}
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
