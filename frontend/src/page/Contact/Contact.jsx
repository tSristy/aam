'use client';

import bannerImg from '../../img/Embaded/4.jpg';
import { Avatar, Box, Button, Container, FormControl, Grid, InputLabel, List, ListItem, ListItemAvatar, ListItemText, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import HeadingText from '../../assets/Text/HeadingText';
import { ContactData } from './ContactData';
import { myTheme } from '../../assets/Theme/myTheme';
import Banner from '../../assets/Banner/Banner';

const Contact = () => {
    const [subject, setSubject] = useState('');

    const handleSubjectChange = (event) => {
        setSubject(event.target.value);
    };

    const [bannerList, setBannerList] = useState([{
        img_url: bannerImg,
        img_name: 'contact'
    }]);


    return (
        < >

            <Banner
                bannerHeight="30rem"
                text={{
                    supportTitle: 'Get in Touch',
                    mainTitle: 'Contact Amzad Ali Memorial Foundation',
                    descriptionText: 'Reach our team in Phulpur, Mymensingh for community programs, healthcare, education and humanitarian support.'
                }}
                img={bannerImg}
                alt="Contact Amzad Ali Memorial Foundation in Mymensingh" />


            <Container sx={{ py: { xs: 6, md: 10 } }}>
                <Grid container spacing={{ xs: 4, md: 6 }} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Grid size={{ xs: 12 }}>
                        <HeadingText givenAlign='center'
                            title='Need Quick Assistance?' details="Our team is ready to assist with community programs, healthcare, education, volunteering and humanitarian support."
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box component="form" noValidate autoComplete="off">
                            <Typography variant='h5' sx={{ mb: 2 }}>Send a Message</Typography>
                            <TextField
                                label="Name"
                                variant="outlined"
                                fullWidth size="small" color="primary"
                                sx={{ mt: 1 }}
                            />
                            <TextField
                                label="Phone"
                                type="tel"
                                variant="outlined"
                                fullWidth size="small" color="primary"
                                sx={{ mt: 1 }}
                            />
                            <TextField
                                label="Email"
                                type="email"
                                variant="outlined"
                                fullWidth size="small" color="primary"
                                sx={{ mt: 1 }}
                            />

                            <FormControl fullWidth color='primary' size='small' sx={{ mt: 1 }}>
                                <InputLabel>Subject</InputLabel>
                                <Select
                                    value={subject}
                                    label="Subject"
                                    onChange={handleSubjectChange}
                                >
                                    <MenuItem value="Product Inquiry">Product Inquiry</MenuItem>
                                    <MenuItem value="Technical Support">Technical Support</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </Select>
                            </FormControl>

                            <TextField
                                label="Message"
                                multiline
                                rows={4}
                                variant="outlined"
                                fullWidth
                                sx={{ mb: 5, mt: 1 }}
                            />

                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                            >
                                Send now
                            </Button>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box component="form" noValidate autoComplete="off">
                            <List >
                                {ContactData.map((item, index) => (
                                    <ListItem key={index} sx={{ py: 1 }}>
                                        <ListItemAvatar>
                                            <Avatar sx={{ bgcolor: myTheme.palette.blue }}>
                                                {item.icon}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={item.title} secondary={item.description} sx={{ overflowWrap: 'anywhere' }} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Grid>
                </Grid>
            </Container>


            <Box sx={{ display: "block" }}>
                <Box component="iframe" title="Amzad Ali Memorial Foundation location in Mymensingh" sx={{ display: 'block', border: 0, width: '100%', height: { xs: 320, md: 450 } }} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.093785063453!2d90.35846339999999!3d24.928874800000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3757b5ae4eeeac69%3A0x7f340ca03f2d98e8!2sAmzad%20Ali%20Memorial%20Foundation!5e0!3m2!1sen!2sbd!4v1764103568550!5m2!1sen!2sbd" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </Box>
        </>
    );
};

export default Contact;