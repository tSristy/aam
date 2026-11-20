'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery
} from '@mui/material';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import CollectionsRoundedIcon from '@mui/icons-material/CollectionsRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import { useAuth } from '../context/AuthContext';

const drawerWidth = 284;

const nav = [
  {
    label: 'Dashboard',
    helper: 'CMS overview',
    to: '/admin',
    icon: <DashboardRoundedIcon />
  },
  {
    label: 'Moments Gallery',
    helper: 'Public /moments section',
    to: '/admin/moments',
    icon: <CollectionsRoundedIcon />
  },
  {
    label: 'News & Articles',
    helper: 'Public /news-articles section',
    to: '/admin/news',
    icon: <ArticleRoundedIcon />
  }
];

function SidebarContent({ onNavigate }) {
  const { admin, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path) => {
    if (path === '/admin') return pathname === '/admin';
    return pathname.startsWith(path);
  };

  return (
    <Stack sx={{ height: '100%', p: 2.25 }} spacing={2}>
      <Box
        sx={{
          p: 2.25,
          borderRadius: 5,
          background: 'linear-gradient(135deg, #e8f5e9 0%, #ffffff 100%)',
          border: '1px solid rgba(46,125,50,.12)'
        }}
      >
        <Typography sx={{ fontWeight: 950, fontSize: '1.1rem', color: '#1b5e20', lineHeight: 1.1 }}>
          AAMF CMS
        </Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: '.78rem', mt: .6 }}>
          Manage public website content
        </Typography>
      </Box>

      <List sx={{ px: 0, flex: 1 }}>
        {nav.map((item) => {
          const active = isActive(item.to);
          return (
            <ListItemButton
              key={item.to}
              component={Link}
              href={item.to}
              onClick={onNavigate}
              sx={{
                mb: 1,
                borderRadius: 4,
                alignItems: 'flex-start',
                px: 1.6,
                py: 1.35,
                color: active ? '#1b5e20' : '#344054',
                background: active ? 'linear-gradient(135deg, #e8f5e9, #f7fff8)' : 'transparent',
                border: active ? '1px solid rgba(46,125,50,.18)' : '1px solid transparent',
                boxShadow: active ? '0 14px 34px rgba(46,125,50,.12)' : 'none',
                '&:hover': {
                  background: active ? 'linear-gradient(135deg, #e8f5e9, #f7fff8)' : '#f6faf7'
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 42, color: active ? '#2e7d32' : '#667085', pt: .15 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                secondary={item.helper}
                primaryTypographyProps={{ fontWeight: 850, fontSize: '.94rem' }}
                secondaryTypographyProps={{ fontSize: '.76rem' }}
              />
            </ListItemButton>
          );
        })}
      </List>

      <Stack spacing={1.25}>
        <Button
          component="a"
          href="/"
          target="_blank"
          startIcon={<VisibilityRoundedIcon />}
          variant="outlined"
          color="success"
          sx={{ borderRadius: 3, justifyContent: 'flex-start', py: 1.1 }}
        >
          View Website
        </Button>
        <Box sx={{ p: 1.7, borderRadius: 4, bgcolor: '#f8faf8', border: '1px solid #e7efe8' }}>
          <Typography sx={{ fontSize: '.76rem', color: 'text.secondary' }}>Logged in as</Typography>
          <Typography sx={{ fontWeight: 850, color: '#1f2937' }}>{admin?.name || 'Admin'}</Typography>
        </Box>
        <Button
          onClick={() => { logout(); router.replace('/admin/login'); }}
          startIcon={<LogoutRoundedIcon />}
          color="error"
          sx={{ borderRadius: 3, justifyContent: 'flex-start', py: 1.1 }}
        >
          Logout
        </Button>
      </Stack>
    </Stack>
  );
}

export default function AdminLayout({ children }) {
  const isDesktop = useMediaQuery('(min-width:960px)');
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f7fbf8 0%, #eef7f0 45%, #f8fbff 100%)' }}>
      {isDesktop ? (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              border: 0,
              background: 'rgba(255,255,255,.82)',
              backdropFilter: 'blur(18px)',
              boxShadow: '18px 0 60px rgba(16,24,40,.06)'
            }
          }}
        >
          <SidebarContent />
        </Drawer>
      ) : (
        <>
          <Toolbar
            sx={{
              position: 'sticky',
              top: 0,
              zIndex: 10,
              bgcolor: 'rgba(255,255,255,.86)',
              backdropFilter: 'blur(18px)',
              borderBottom: '1px solid #e3eee6'
            }}
          >
            <IconButton onClick={() => setOpen(true)} edge="start" sx={{ mr: 1 }}>
              <MenuRoundedIcon />
            </IconButton>
            <Typography sx={{ fontWeight: 950, color: '#1b5e20' }}>AAMF CMS</Typography>
          </Toolbar>
          <Drawer open={open} onClose={() => setOpen(false)}>
            <Box sx={{ width: drawerWidth }}>
              <SidebarContent onNavigate={() => setOpen(false)} />
            </Box>
          </Drawer>
        </>
      )}

      <Box component="main" sx={{ ml: { md: `${drawerWidth}px` }, p: { xs: 2, sm: 3, md: 4 } }}>
        <Box sx={{ maxWidth: 1320, mx: 'auto' }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
