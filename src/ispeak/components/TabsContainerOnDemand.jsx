import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { ModalTabsProvider } from "../context";
import { TabOneOnDemand } from "./TabOneOnDemand";
import { TabOneProfessors } from "./TabOneProfessors";
import { TabPanel } from "./TabPanel";
import { TabsTwoOnDemand } from "./TabsTwoOnDemand";

export const TabsContainerOnDemand = () => {
     const [value, setValue] = useState(0);
     const handleChange = (e, newValue) => {
          setValue(newValue);
     };
     return (
          <ModalTabsProvider>
               <Box sx={{ pr: 2 }}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                         <Tabs value={value} onChange={handleChange}>
                              <Tab
                                   label="Datos del curso"
                                   sx={{ color: "primary.main" }}
                              />
                              <Tab
                                   label="Modulos"
                                   sx={{ color: "primary.main" }}
                              />
                         </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                         <TabOneOnDemand />
                         <TabOneProfessors />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                         <TabsTwoOnDemand />
                    </TabPanel>
               </Box>
          </ModalTabsProvider>
     );
};
