'use client';

import { Box, Grid, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { myTheme } from "../Theme/myTheme";
import React from "react";
import BtnUrlChange from "../Button/BtnUrlChange";
import UpComingFriday from "../Date/UpComingFriday";

const ImgCard1 = ({ imgUrl, title, amount }) => {
    return (
        <Grid container>
            <Grid size={{ xs: 12, sm: 5 }}>
                <Box component="img"
                    src={typeof imgUrl === "string" ? imgUrl : imgUrl?.src}
                    alt={title || "Amzad Ali Memorial Foundation community support"}
                    sx={{
                        filter: "grayscale(100%)",
                        boxShadow: 1,
                        height: { xs: "240px", sm: "350px" },
                        width: "100%",
                        // borderRadius: 2,
                        objectFit: "cover",
                        transition: "all 1s ease",
                        '&:hover': {
                            filter: "none"
                        }
                    }} />
            </Grid>
            <Grid size={{ xs: 12, sm: 7 }} sx={{
                bgcolor: myTheme.palette.lightGreen,
                p: { xs: 2.5, sm: 4 },
                display: "flex",
                flexDirection: "column"
            }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: myTheme.palette.textColor }}>{title}</Typography>
                <Box sx={{ mt: 'auto' }}>
                    <Stack direction="row" spacing={2} sx={{
                        mb: 2,
                        justifyContent: "space-between",
                        alignItems: "center",
                        '& .MuiTypography-h4': { fontSize: { xs: '1.5rem', sm: '2.125rem' } },
                    }}>
                        <Box>
                            <Typography variant="subtitle2">Next Date</Typography>
                            <UpComingFriday variantStyle="h4" />
                        </Box>
                        <Box>
                            <Typography variant="subtitle2">Help Reached</Typography>
                            <Typography variant="h4">{amount}</Typography>
                        </Box>
                    </Stack>
                </Box>
                <BtnUrlChange btnDetails={{ btnTitle: "Learn more", url: "" }} />
            </Grid>
        </Grid>
    )
}

export default ImgCard1;