import { createTheme } from "@mui/material";

export const blueTheme = createTheme({
     palette: {
          primary: {
               main: "#0d2e68",
               light: '#fff',
               dark: "#00001c",
          },
          text: {
               primary: "#0d2e68",
               secondary: "#fff",
          },
     },
     typography: {
          fontFamily: `'Montserrat', sans-serif`,
     },
});
