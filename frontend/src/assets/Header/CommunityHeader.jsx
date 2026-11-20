'use client';

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Box,
    Container,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    Stack,
    Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { mainBarData } from "./HeaderData";
import { myTheme } from "../Theme/myTheme";
import logoImg from "../../img/logo/logo.svg";

const CommunityHeader = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (url) =>
        url === "/" ? pathname === "/" : pathname?.startsWith(url);

    return (
        <Box component="header" sx={{
            boxShadow: 1,
            bgcolor: "white",
            position: "sticky",
            top: 0,
            zIndex: 999
        }}>
            <Container>
                <Stack direction="row" sx={{
                    py: 1,
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                }}>
                    <Link href="/" aria-label="Amzad Ali Memorial Foundation home" style={{ display: "flex", flexShrink: 0 }}>
                        <img src={logoImg?.src || logoImg} style={{ height: '3rem' }} alt="Amzad Ali Memorial Foundation Logo" />
                    </Link>

                    {/* Desktop navigation */}
                    <Stack
                        component="nav"
                        aria-label="Primary navigation"
                        direction="row"
                        sx={{
                            display: { xs: "none", md: "flex" },
                            alignItems: "center",
                            columnGap: { md: 2.5, lg: 4 },
                        }}
                    >
                        {mainBarData.map((item) => (
                            <Link
                                key={item.url}
                                href={item.url}
                                aria-current={isActive(item.url) ? "page" : undefined}
                                style={{ color: 'inherit', textDecoration: 'none' }}
                            >
                                <Typography sx={{
                                    color: myTheme.palette.blue,
                                    textTransform: "uppercase",
                                    fontWeight: 600,
                                    whiteSpace: "nowrap",
                                    fontSize: { md: ".85rem", lg: "1rem" },
                                    letterSpacing: { md: "1px", lg: "2px" },
                                    py: 0.5,
                                    borderBottom: 2,
                                    borderColor: isActive(item.url) ? myTheme.palette.green : "transparent",
                                    "&:hover": { borderColor: myTheme.palette.green },
                                }}>
                                    {item.title}
                                </Typography>
                            </Link>
                        ))}
                    </Stack>

                    {/* Mobile menu button */}
                    <IconButton
                        aria-label="Open navigation menu"
                        onClick={() => setDrawerOpen(true)}
                        sx={{ display: { xs: "inline-flex", md: "none" }, color: myTheme.palette.blue }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Stack>
            </Container>

            {/* Mobile navigation drawer */}
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                sx={{ display: { md: "none" } }}
                slotProps={{ paper: { sx: { width: "min(80vw, 300px)" } } }}
            >
                <Stack direction="row" sx={{ p: 1, justifyContent: "flex-end" }}>
                    <IconButton aria-label="Close navigation menu" onClick={() => setDrawerOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </Stack>
                <List component="nav" aria-label="Mobile navigation" sx={{ px: 1 }}>
                    {mainBarData.map((item) => (
                        <ListItemButton
                            key={item.url}
                            component={Link}
                            href={item.url}
                            selected={isActive(item.url)}
                            onClick={() => setDrawerOpen(false)}
                            sx={{ borderRadius: 1 }}
                        >
                            <ListItemText
                                primary={item.title}
                                slotProps={{
                                    primary: {
                                        sx: {
                                            color: myTheme.palette.blue,
                                            textTransform: "uppercase",
                                            fontWeight: 600,
                                        },
                                    },
                                }}
                            />
                        </ListItemButton>
                    ))}
                </List>
            </Drawer>
        </Box>
    )
}

export default CommunityHeader;
