import { createTheme } from "@mui/material";

export const myTheme = createTheme({
    typography: {
        // MUI's default stack plus Noto Sans Bengali so Bangla text in buttons,
        // chips, inputs and menus renders correctly on every device.
        fontFamily: '"Roboto","Helvetica","Arial","Noto Sans Bengali",sans-serif',
    },
    palette: {
        // blue: "#203cc7",

        blue: "#3674B5",
        lightBlue: "#d2f3ffff",

        yellow: "#FFEB3B",
        orange: "#FF894F",

        green: "#76BA1B",
        lightGreen: "#75ba1b47",

        textColor: "#2A2A2A",
        miniText: "#747474ff"
    },
})
