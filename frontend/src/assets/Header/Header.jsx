import { Box, Container, Divider, Grid, Stack, Typography } from "@mui/material";
import logoImg from "../../img/logo/logo.svg";
import { subBarData, mainBarData } from "./HeaderData";
import { myTheme } from "../Theme/myTheme";

const Header = () => {
    return (
        <Box sx={{
            bgcolor: myTheme.palette.blue
        }}>
            <Container sx={{ p: 1 }}>
                <Typography sx={{ color: "white", fontSize: ".8rem" }}>+880 17962 99885
                </Typography>
            </Container>

            <Box sx={{
                bgcolor: "white"
                // bgcolor: myTheme.palette.blue
            }}>
                <Container maxWidth>
                    <Grid container sx={{ justifyContent: "center", alignItems: "stretch" }}>
                        <Grid size={{ xs: 2 }} sx={{p:1}}>
                            <img src={logoImg?.src || logoImg} style={{ height: '5rem' }} alt="Amzad Ali Memorial Foundation Logo" />
                        </Grid>
                        <Grid size={{ xs: 10 }}>
                            <Stack direction="row" spacing={2} sx={{
                                height: "100%",
                                justifyContent: "flex-start",
                                alignItems: "center"
                            }}>
                                {
                                    subBarData.map((item, index) => (
                                        <Box key={index} sx={{ m: 2, p: 2 }}>
                                            <Typography sx={{ fontWeight: '500', color: "white", textTransform: "camalcase" }}>{item.title}</Typography>
                                        </Box>
                                    ))
                                }
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>
                <Divider />
            </Box>
        </Box>
    )
}

export default Header;