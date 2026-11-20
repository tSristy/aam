'use client';

import { Box, Container, Divider, Grid, Link, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { FactoryInfo, footerIcon, footerInfo } from './FooterData.jsx';
import BtnExternalUrl from '../Button/BtnExternalUrl';

import React, { useState } from "react";
import PatientDetailsModal from '../Modal/PatientDetailsModal.jsx';

const Footer = () => {
    const [openPatientModal, setOpenPatientModal] = useState(false);
    return (
        <Box component="footer" sx={{
            backgroundColor: '#2b2b2b',
        }}>
            <Container sx={{ py: { xs: 3, md: 4 }, px: { xs: 2, md: 4 } }}>
                <Grid
                    container
                    direction="row"
                    rowSpacing={{ xs: 3, md: 0 }}
                    columnSpacing={{ xs: 2, md: 0 }}
                    sx={{
                        pt: { xs: 2, md: 5 },
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                    }}
                >
                    <Grid size={{ xs: 12, md: 5 }}>
                        <Box>
                            <Typography variant='h6' sx={{ letterSpacing: 2, color: '#ffffffff', fontWeight: 600 }}>
                                Reach Us
                            </Typography>
                            <List>
                                {footerInfo.map((item, index) => (
                                    <ListItem key={index}>
                                        <ListItemIcon sx={{ color: '#ffffffff' }}>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText sx={{ color: '#ffffffff', overflowWrap: 'anywhere' }}>{item.description}</ListItemText>
                                    </ListItem>
                                ))}
                            </List>
                            <Typography variant='h6' sx={{ letterSpacing: 2, color: '#ffffffff', fontWeight: 600 }}>
                                Area
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemIcon sx={{ color: '#ffffffff' }}>
                                        {FactoryInfo.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={FactoryInfo.description} sx={{ color: "white" }} />
                                </ListItem>
                            </List>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                        <Typography variant='h6' sx={{ letterSpacing: 2, color: '#ffffffff', fontWeight: 600 }}>
                            Quick Links
                        </Typography>
                        <List>
                            <ListItem>
                                <Link href="/about" color="white" underline="none">About us
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link href="/community" color="white" underline="none">Food Distribution</Link>
                            </ListItem>
                            <ListItem>
                                <Link href="/community" color="white" underline="none">Clothing Distribution</Link>
                            </ListItem>
                            <ListItem>
                                <Link href="/community" color="white" underline="none">Support for Families</Link>
                            </ListItem>
                            <ListItem>
                                <Link href="/community" color="white" underline="none">Social Works</Link>
                            </ListItem>

                            {/* Add patient modal */}
                            <ListItem>
                                <Typography
                                    sx={{
                                        color: "white",
                                        cursor: "pointer",
                                        "&:hover": {
                                            textDecoration: "underline",
                                        },
                                    }}
                                    onClick={() => setOpenPatientModal(true)}
                                >
                                    Patient Registration
                                </Typography>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} container
                        direction="column"
                        sx={{ alignItems: { xs: 'flex-start', md: 'flex-end' } }}>

                        <Typography variant='h6' sx={{ letterSpacing: 2, color: '#ffffffff', fontWeight: 600 }}>
                            Follow Us
                        </Typography>
                        <Box sx={{ py: 2 }}>
                            {
                                footerIcon.map((item, index) => (
                                    <BtnExternalUrl key={index} btnDetails={{ btnIcon: item.icon, btnUrl: item.url }} />
                                ))
                            }
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            <Divider sx={{ bgcolor: '#9b9b9bff' }} />

            <Grid container direction="row" rowSpacing={1.5} sx={{
                px: { xs: 2, md: 3 },
                py: 3,
                color: 'white',
                justifyContent: { xs: 'center', md: 'space-between' },
                textAlign: { xs: 'center', md: 'left' },
                alignItems: "center"
            }}>
                <Grid size={{ xs: 12, md: 'auto' }}>
                    <Typography variant='outline' sx={{ letterSpacing: 2, color: '#9b9b9bff' }}>
                        AMZAD ALI MEMORIAL FOUNDATION
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 'auto' }}>
                    <Typography sx={{ letterSpacing: { xs: 1, md: 3 }, fontSize: { xs: '10px', md: '9px' }, color: '#9b9b9bff' }}>
                        ALL RIGHTS RESERVED COPYRIGHTS BY AAM Foundation
                    </Typography>
                </Grid>
            </Grid >

            {/* Add patient modal */}
            <PatientDetailsModal
                open={openPatientModal}
                onClose={() => setOpenPatientModal(false)}
            />

        </Box>
    );
};

export default Footer;