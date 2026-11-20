import { Box, Typography } from "@mui/material";
import { myTheme } from "../Theme/myTheme";

const HeadingText = ({ title, details, givenAlign, bgBlack }) => {
    return (
        <Box >
            <Typography component="h2" fontSize={{
                xs: "2rem",
                md: "3rem"
            }} sx={{ fontWeight: '600', color: bgBlack ? 'white' : myTheme.palette.textColor, textAlign: givenAlign }}>{title}</Typography>

            <Typography component="p" variant="subtitle1" sx={{ mt: details ? 2 : 0, textAlign: givenAlign, color: bgBlack ? 'white' : myTheme.palette.miniText, whiteSpace: "pre-line" }}>
                {details}
            </Typography>
        </Box>
    )
}

export default HeadingText;
