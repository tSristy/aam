'use client';

import { Avatar, Box, Stack, Typography } from "@mui/material";
import { myTheme } from "../Theme/myTheme";
import { useState } from "react";

const ColumnStyleCard = ({ item, type, onClick }) => {
    const [hoverVar, setHoverVar] = useState(false)
    if (type === 2) {
        return (
            <Stack sx={{ 
                alignItems: "center",              
             }}>
                <Avatar sx={{ bgcolor: item.color, height: "120px", width: "120px", color: "white"}}>
                    {item.icon}
                </Avatar>
                <Typography sx={{ py: 1, fontWeight: 600, color: myTheme.palette.textColor }}>
                    {item.title}
                </Typography>
                <Typography sx={{fontSize: ".9rem", whiteSpace: "pre-line", textAlign: "center", color: myTheme.palette.miniText }}>
                    {item.details}
                </Typography>
            </Stack>
        )
    }
    else {
        return (
            <Box sx={{
                p: 3,
                transition: "all 0.3s ease",
                '&:hover': {
                    // Big zoom only where there is room for it (it overlaps neighbours / causes side-scroll on phones)
                    transform: { xs: 'scale(1.02)', md: 'scale(1.2)' },
                    bgcolor: myTheme.palette.green,
                    cursor: "pointer",
                    color: 'white'
                }
            }}
                onMouseEnter={() =>
                    setHoverVar(true)}
                onMouseLeave={() =>
                    setHoverVar(false)
                }
                onClick={onClick}
            >
                <Typography sx={{ color: hoverVar ? 'white' : myTheme.palette.yellow }}>
                    {item.icon}
                </Typography>
                <Typography sx={{ py: 1, fontWeight: 600, color: hoverVar ? 'white' : myTheme.palette.blue }}>
                    {item.title}
                </Typography>
                <Typography sx={{ fontSize: ".9rem", whiteSpace: "pre-line", color: hoverVar ? 'white' : myTheme.palette.miniText }}>
                    {item.details}
                </Typography>
            </Box>
        )
    }
}

export default ColumnStyleCard;