import { Box, Typography } from "@mui/material";

export const TabPanel = ({ children, value, index }) => {
     return (
          <div
               role="tabpanel"
               hidden={value !== index}
               id={`simple-tabpanel-${index}`}
               aria-labelledby={`simple-tab-${index}`}
          >
               {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
          </div>
     );
};
