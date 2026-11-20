'use client';

import bannerImg from "../../img/Embaded/DSC04953.jpg";
import { Box, Container, Divider, Grid, ImageList, ImageListItem, List, ListItem, ListItemIcon, ListItemText, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { imageList, initiativeList, propsList, welfareList } from "./CommunityHomepageData";
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
import VolunteerModal from "../../assets/Modal/VolunteerModal";
import PatientDetailsModal from "../../assets/Modal/PatientDetailsModal";

const CommunityHomepage = () => {
    const [hoverVar, setHoverVar] = useState(false)
    const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
    const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
    return (
        <>
             <VolunteerModal
                open={isVolunteerModalOpen}
                onClose={() => setIsVolunteerModalOpen(false)}
            />

            <PatientDetailsModal
                open={isPatientModalOpen}
                onClose={() => setIsPatientModalOpen(false)}
            />

            <Banner
                bannerHeight="35rem"
                text={{
                    supportTitle: 'Serving Humanity with Compassion and Dedication',
                    mainTitle: 'Amzad ali memorial foundation',
                    descriptionText: `Empowering society through Education, Health & Development.`
                }}
                img={bannerImg}
                btnDetails={{
                    btnTitle: "Explore",
                    url: "",
                    color: true
                }}
                alt="Amzad Ali Memorial Foundation serving communities in Mymensingh" />

            <Box sx={{
                py: { xs: 6, md: 10 },
            }}>
                <Container>
                    <Stack sx={{
                        bgcolor: "white",
                        p: 1,
                        borderRadius: 1,
                        boxShadow: 1,
                        alignItems: "stretch",
                        justifyContent: "space-evenly"
                    }}
                        direction={{ xs: 'column', sm: 'row' }}
                        divider={<Box sx={{ alignSelf: 'stretch', borderTop: { xs: '1px solid', sm: 0 }, borderLeft: { xs: 0, sm: '1px solid' }, borderColor: 'divider' }} />}
                    >

                        {/* {
                            propsList.map(item => (
                                <ColumnStyleCard key={item.id} item={item} />
                            ))
                        } */}

                        {
                            propsList.map(item => (
                                <ColumnStyleCard 
                                    key={item.id} 
                                    item={item} 
                                    onClick={
                                    item.title === "Volunteer"
                                    ? () => setIsVolunteerModalOpen(true)
                                    : undefined
                                }/>
                            ))
                        }

                        {/* {propsList.map((item) => {
                            let handleClick;
                            if (item.title === "Donate Now") {
                            handleClick = () => setIsPatientModalOpen(true);
                            } else if (item.title === "Volunteer") {
                            handleClick = () => setIsVolunteerModalOpen(true);
                            }

                            return (
                            <ColumnStyleCard
                                key={item.id}
                                item={item}
                                onClick={handleClick}
                            />
                            );
                        })} */}

                    </Stack>
                </Container>
            </Box>

            <Box sx={{
                py: { xs: 6, md: 10 },
                bgcolor: myTheme.palette.blue
            }}>
                <Container>
                    <HeadingText
                        title="Core Initiatives"
                        bgBlack="true"
                        givenAlign="center"
                        details={"Beyond technology, we are committed to making a positive impact \n across various sectors."}
                    />
                    <Grid container spacing={4} sx={{ pt: { xs: 5, md: 10 } }}>
                        {initiativeList.map(item => (
                            <Grid size={{ xs: 12, sm: 6 }} key={item.id}>
                                <RowStyleCard item={item} />
                            </Grid>))
                        }
                    </Grid>
                </Container>
            </Box>


            <Box sx={{
                py: { xs: 6, md: 10 },
            }}>
                <Container>
                    <HeadingText title="Welfare Activities" givenAlign="center" details={"Working together to build a stronger, more compassionate community."} />

                    <Grid container sx={{ pt: { xs: 5, md: 10 } }}>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Box component="img"
                                src={img15?.src || img15}
                                alt="Weekly Support for Visually Impaired Individuals"
                                sx={{
                                    filter: "grayscale(100%)",
                                    boxShadow: 1,
                                    height: { xs: "240px", sm: "300px", md: "500px" },
                                    width: "100%",
                                    // borderRadius: 2,
                                    objectFit: "cover",
                                    transition: "all 1s ease",
                                    '&:hover': {
                                        filter: "none"
                                    }
                                }} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 8 }}>
                            <Box sx={{ p: { xs: 2, md: 5 } }}>
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: myTheme.palette.textColor }}>Weekly Support for Visually Impaired Individuals</Typography>
                                <Typography sx={{ fontSize: ".9rem", color: myTheme.palette.textColor }}>
                                    Every week, our community organizes and funds eye care initiatives for underprivileged individuals suffering from vision problems.
                                </Typography>
                                <Divider sx={{ my: 4 }} />

                                <List>
                                    <ListItem>
                                        <ListItemIcon>
                                            <CheckCircleIcon sx={{ color: myTheme.palette.yellow }} />
                                        </ListItemIcon>
                                        <ListItemText secondary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="subtitle1"
                                                    sx={{ color: myTheme.palette.textColor, display: 'inline' }}
                                                >
                                                    Free Eye Operations
                                                </Typography>
                                                {" - We sponsor and arrange cataract and other vision-restoring surgeries for those who cannot afford treatment."}
                                            </React.Fragment>
                                        }
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <CheckCircleIcon sx={{ color: myTheme.palette.yellow }} />
                                        </ListItemIcon>
                                        <ListItemText secondary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="subtitle1"
                                                    sx={{ color: myTheme.palette.textColor, display: 'inline' }}
                                                >
                                                    Medical Equipment
                                                </Typography>
                                                {" - We supply glasses, walking aids, and other necessary tools to help them live more independently.Our mission is to bring light back into the lives of people who have lost their vision due to poverty and lack of medical access."}
                                            </React.Fragment>
                                        }
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <CheckCircleIcon sx={{ color: myTheme.palette.yellow }} />
                                        </ListItemIcon>
                                        <ListItemText secondary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="subtitle1"
                                                    sx={{ color: myTheme.palette.textColor, display: 'inline' }}
                                                >
                                                    Financial Assistance
                                                </Typography>
                                                {" - We provide transportation costs, medicine, hospital expenses, and post-surgery care."}
                                            </React.Fragment>
                                        }
                                        />
                                    </ListItem>
                                </List>
                            </Box>
                        </Grid>
                    </Grid>


                    <Grid container sx={{ pt: { xs: 5, md: 10 } }} spacing={4}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <ImgCard1 imgUrl={img12} title="Flood and Disaster Relief Food Distribution" amount="30k" />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <ImgCard1 imgUrl={img5} title="Winter Clothing Distribution" amount="50k" />
                        </Grid>
                    </Grid>
                </Container>

                <Container sx={{
                    pt: { xs: 6, md: 10 }
                }}>
                    <HeadingText title="Donation, Eid Zakat & Collaboration" details={"We believe in building a stronger, more compassionate society by standing beside those who need help the most. Every project is fueled by community donations, volunteer work, and the belief that small acts of kindness can create lasting change."} givenAlign="center" />

                    <Grid container spacing={2} sx={{ py: { xs: 5, md: 10 } }}>
                        {
                            welfareList.map(item => (
                                <Grid size={{ xs: 12, md: 6, lg: 3 }} key={item.id}>
                                    <ColumnStyleCard type={2} item={item} />
                                </Grid>
                            ))
                        }
                    </Grid>
                </Container>

                <Box sx={{
                    '--gallery-h': { xs: '320px', md: '450px' },
                    height: 'var(--gallery-h)',
                    overflow: "hidden",
                    position: "relative"
                }}
                    onMouseEnter={() =>
                        setHoverVar(true)}
                    onMouseLeave={() =>
                        setHoverVar(false)
                    }>
                    {
                        hoverVar && <Box sx={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            height: "100%",
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 2
                        }}>
                            <BtnUrlChange btnDetails={{ btnTitle: "join our program", url: "" }} />
                        </Box>
                    }
                    <Container sx={{
                        animation: "autoScroll 10s ease-in-out infinite alternate",
                        "@keyframes autoScroll": {
                            "0%": { transform: "translateY(0%)" },
                            "100%": { transform: "translateY(calc(-85% + var(--gallery-h)))" },
                        },
                    }}>
                        <ImageList
                            variant="masonry"
                            cols={4}
                            gap={8}
                            sx={{ columnCount: { xs: '2 !important', sm: '3 !important', md: '4 !important' } }}
                        >
                            {imageList.map((item) => (
                                <ImageListItem
                                    key={item.id}
                                >
                                    <img style={{ filter: "grayscale(100%)" }}
                                        srcSet={`${typeof item.src === "string" ? item.src : item.src?.src}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                        src={`${typeof item.src === "string" ? item.src : item.src?.src}?w=248&fit=crop&auto=format`}
                                        alt={item.title}
                                        loading="lazy"
                                    />
                                </ImageListItem>
                            ))}

                        </ImageList>
                    </Container>
                </Box>
            </Box>


            <Box sx={{
                py: { xs: 6, md: 10 },
                bgcolor: myTheme.palette.blue
            }}>
                <Container>
                    <HeadingText title="Our Story" bgBlack={true} givenAlign="center" details={"We value personal health and learning. A world where everyone have the brightest smile."} />

                    <Grid container sx={{ pt: { xs: 5, md: 10 }, alignItems: "center" }}>
                        <Grid size={{ xs: 12, md: 8 }}>
                            <Box sx={{ p: { xs: 2, md: 5 } }}>
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: "white" }}>A man who dedicated his life to serving the community</Typography>
                                <Typography sx={{ fontSize: ".9rem", color: "white" }}>
                                    Amzad Ali Memorial Foundation was established to honor the memory of Amzad Ali Miah, a man who dedicated his life to serving the community. Inspired by his humanitarian values, the foundation focuses on education, healthcare, social welfare, and community development. Since 2007, it has been working to bring positive change to rural communities in Mymensingh and beyond.
                                </Typography>

                                <Divider sx={{ my: 4, bgcolor: "white" }} />
                                <Typography color="white">Learn more about us...</Typography>

                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Box
                                component="img"
                                src={dadaImg?.src || dadaImg}
                                alt="Amzad Ali Miah, whose humanitarian legacy inspired the foundation"
                                sx={{
                                    // filter: "grayscale(50%)",
                                    boxShadow: 2,
                                    display: "block",
                                    width: "100%",
                                    maxWidth: { xs: 320, md: "100%" },
                                    mx: "auto",
                                    objectFit: "cover",
                                }}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    )
}

export default CommunityHomepage;