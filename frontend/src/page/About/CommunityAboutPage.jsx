'use client';

import bannerImg from "../../img/Embaded/9.jpg";
import { Avatar, Box, Container, Divider, Grid, ImageList, ImageListItem, ImageListItemBar, List, ListItem, ListItemIcon, ListItemText, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Header from "../../assets/Header/Header";
import CommunityHeader from "../../assets/Header/CommunityHeader";
import Banner from "../../assets/Banner/Banner";
import ColumnStyleCard from "../../assets/Card/ColumnStyleCard";
import { myTheme } from "../../assets/Theme/myTheme";
import HeadingText from "../../assets/Text/HeadingText";
import RowStyleCard from "../../assets/Card/RowStyleCard";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import React, { useState } from "react";
import ImgCard1 from "../../assets/Card/ImgCard1";
import dadaImg from "../../img/Embaded/dada.png";
import imgBlidPeople from "../../img/Embaded/Blinds.png";
import img5 from "../../img/Embaded/5.jpg";
import img12 from "../../img/Embaded/12.jpg";
import img15 from "../../img/Embaded/15.jpg";
import BtnUrlChange from "../../assets/Button/BtnUrlChange";
import Footer from "../../assets/Footer/Footer";
import { HistoryData, historyImgList, objectiveList, philosophyList } from "./AboutData";

const CommunityAboutPage = () => {
    return (
        <>
            <Banner
                bannerHeight="30rem"
                text={{
                    supportTitle: 'Our Story • Since 2007',
                    mainTitle: 'About Amzad Ali Memorial Foundation',
                    descriptionText: 'Learn about our humanitarian legacy, mission and service to communities in Mymensingh, Bangladesh.'
                }}
                img={bannerImg}
                alt="About Amzad Ali Memorial Foundation" />


            <Box sx={{
                py: { xs: 6, md: 10 }
            }}>
                <Container>
                    <Grid container sx={{
                        alignItems: "center"
                    }} spacing={4}>
                        <Grid size={{ xs: 12, md: 8 }}>
                            <Box>
                                <Typography variant="h6" sx={{ color: myTheme.palette.textColor, mb: 2, fontWeight: 600, textTransform: 'capitalize' }}>A man who dedicated his life to serving the community</Typography>
                                <Typography sx={{ fontSize: ".9rem", color: myTheme.palette.miniText }}>
                                    The <Box component="span" sx={{ color: myTheme.palette.textColor, fontWeight: 600 }}>
                                        Amzad Ali Memorial Foundation
                                    </Box> was established to honor the memory of <Box component="span" sx={{ fontWeight: 600, color: myTheme.palette.blue }}>Amzad Ali Miah</Box>, a man who dedicated his life to serving the community. {<br />}{<br />} Inspired by his humanitarian values, the foundation focuses on education, healthcare, social welfare, and community development. Since <Box component="span" sx={{ color: myTheme.palette.textColor, fontWeight: 600 }}>2007</Box>, it has been working to bring positive change to rural communities in Mymensingh and beyond.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Box
                                component="img"
                                src={dadaImg?.src || dadaImg}
                                alt="Amzad Ali Miah, whose humanitarian values inspired Amzad Ali Memorial Foundation"
                                sx={{
                                    filter: "grayscale(100%)",
                                    boxShadow: 2,
                                    display: "block",
                                    width: "100%",
                                    maxWidth: { xs: 320, md: "100%" },
                                    mx: "auto",
                                    objectFit: "cover",
                                }}
                            />
                        </Grid>


                        <Grid size={{ xs: 12, md: 4 }}>
                            <Box
                                component="img"
                                src={typeof historyImgList[0].src === "string" ? historyImgList[0].src : historyImgList[0].src?.src}
                                alt="Family members continuing the humanitarian legacy of Amzad Ali Memorial Foundation"
                                sx={{
                                    filter: "grayscale(100%)",
                                    boxShadow: 2,
                                    display: "block",
                                    width: "100%",
                                    maxWidth: { xs: 320, md: "100%" },
                                    mx: "auto",
                                    objectFit: "cover",
                                }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 8 }}>
                            <Box>
                                <Typography variant="h6" sx={{ color: myTheme.palette.textColor, mb: 2, fontWeight: 600 }}>Next Generation Steps In</Typography>
                                <Typography sx={{ fontSize: ".9rem", color: myTheme.palette.miniText }}>
                                    After his passing, his family members took responsibility for continuing his vision. To this day,<Box component="span" sx={{ color: myTheme.palette.textColor, fontWeight: 600 }}> all of his sons and daughters</Box> give their heart and soul to uphold his legacy and ensure the foundation keeps making a meaningful impact.

                                    {<br />}{<br />}
                                    As years passed, even the grandchildren began to join the work.
                                    Every winter, they distributed blankets to the elderly, learning stories of how their grandfather used to work to deliver help. They learned to love him through the foundation's work.His values were becoming a family tradition.
                                </Typography>
                            </Box>
                        </Grid>


                    </Grid>
                </Container>
            </Box>



            <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: myTheme.palette.blue }}>
                <Container>
                    <HeadingText
                        title="Legal Status & History"
                        bgBlack="true"
                        givenAlign="center"
                        details={"Officially recognized Community in Bangladesh"}
                    />
                    <Grid container spacing={4} sx={{ pt: { xs: 5, md: 10 } }}>
                        {HistoryData.map(item => (
                            <Grid size={{ xs: 12, sm: 6 }} key={item.id}>
                                {item.url ? (
                                    <Box
                                        component="a"
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={{
                                            textDecoration: "none",
                                            display: "block",
                                            height: "100%",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <RowStyleCard item={item} />
                                    </Box>
                                ) : (
                                    <RowStyleCard item={item} />
                                )}
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>


            <Box sx={{ py: { xs: 6, md: 10 } }}>
                <Container>
                    <HeadingText
                        title="Our Philosophy"
                        givenAlign="center"
                        details={"Driving Change with Purpose. We believe in empowering individuals to create a self-sustaining ecosystem of support."}
                    />

                    <Grid container sx={{ pt: { xs: 5, md: 10 } }} spacing={{ xs: 3, md: 5 }}>
                        {
                            philosophyList.map(item => (
                                <Grid size={{ xs: 12, sm: 6 }} sx={{
                                    borderRadius: 2,
                                    borderTop: 3,
                                    borderColor: myTheme.palette.green,
                                    boxShadow: 2,
                                }} key={item.id}>
                                    <ColumnStyleCard item={item} />
                                </Grid>
                            ))
                        }
                    </Grid>

                </Container>
            </Box>


            <Box sx={{ py: { xs: 6, md: 10 } }}>
                <Container>
                    <HeadingText
                        title="Our Objectives"
                        givenAlign="center"
                        details={"A comprehensive roadmap to achieve a just, healthy, and educated society."}
                    />

                    <Grid container spacing={4} sx={{ mt: { xs: 5, md: 10 } }}>
                        {
                            objectiveList.map(item => (
                                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Avatar sx={{ bgcolor: "#75ba1b1f", height: "35px", width: "35px", color: myTheme.palette.green }}>
                                            {item.icon}
                                        </Avatar>
                                        <Box sx={{ px: 2 }}>

                                            <Typography sx={{ fontSize: '.9rem' }}>{item.title}</Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                            ))
                        }
                    </Grid>

                </Container>
            </Box>

        </>
    )
}

export default CommunityAboutPage;