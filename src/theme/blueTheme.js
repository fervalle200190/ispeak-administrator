import { createTheme } from "@mui/material";

export const blueTheme = createTheme({
     palette: {
          primary: {
               main: "#0d2e68",
               light: '#ddd',
               dark: "#00001c",
          },
          text: {
               primary: "#0d2e68",
               secondary: "#ddd",
          },
     },
     typography: {
          fontFamily: `'Montserrat', sans-serif`,
     },
});
