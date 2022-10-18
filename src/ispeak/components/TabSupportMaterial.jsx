import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { SupportFile } from "./SupportFile";
import { SupportMaterialAdd } from "./SupportMaterialAdd";
import { TabPanel } from "./TabPanel";

export const TabSupportMaterial = () => {
     const [value, setValue] = useState(0);
     const handleChange = (e, newValue) => {
          setValue(newValue);
     };
     return (
          <Box sx={{ pr: 2 }}>
               <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs value={value} onChange={handleChange}>
                         <Tab
                              label="Datos del material"
                              sx={{ color: "primary.main" }}
                         />
                         <Tab label="Archivos" sx={{ color: "primary.main" }} />
                    </Tabs>
               </Box>
               <TabPanel value={value} index={0}>
                    <SupportMaterialAdd />
               </TabPanel>
               <TabPanel value={value} index={1}>
                    <SupportFile />
               </TabPanel>
          </Box>
     );
};
