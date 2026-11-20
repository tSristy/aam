import { Avatar, Box, Stack, Typography } from "@mui/material";
import { myTheme } from "../Theme/myTheme";

const RowStyleCard = ({ item }) => {
    return (
        <Box
            sx={{
                p: 2,
                height: "100%",
                borderRadius: 2,
                bgcolor: '#0000005b'
            }}
        >
            <Stack direction="row" spacing={{ xs: 2, md: 3 }} sx={{ alignItems: "flex-start" }}>
                <Avatar variant="rounded" sx={{ flexShrink: 0, bgcolor: '#0000005b', color: myTheme.palette.lightBlue }}>
                    {item.icon}
                </Avatar>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography sx={{ fontSize: ".9rem", fontWeight: 600, color: '#f3f3f3' }}>
                        {item.title}
                    </Typography>
                    <Typography sx={{ fontSize: ".8rem", whiteSpace: "pre-line", color: '#f3f3f3' }}>
                        {item.details}
                    </Typography>
                </Box>
            </Stack>
        </Box>
    )
}

export default RowStyleCard;
