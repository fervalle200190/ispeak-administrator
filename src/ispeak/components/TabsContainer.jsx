import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { ModalTabsProvider, RoomsProvider } from "../context";
import { TabOne } from "./TabOne";
import { TabPanel } from "./TabPanel";
import { TabThree } from "./TabThree";
import { TabTwo } from "./TabTwo";

export const TabsContainer = ({ businessUnit }) => {
     const [value, setValue] = useState(0);
     const handleChange = (e, newValue) => {
          setValue(newValue);
     };
     return (
          <ModalTabsProvider>
               <RoomsProvider>
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
                                   <Tab
                                        label="Salas"
                                        sx={{ color: "primary.main" }}
                                   />
                              </Tabs>
                         </Box>
                         <TabPanel value={value} index={0}>
                              <TabOne businessUnit={businessUnit} /> 
                         </TabPanel>
                         <TabPanel value={value} index={1}>
                              <TabTwo />
                         </TabPanel>
                         <TabPanel value={value} index={2}>
                              <TabThree />
                         </TabPanel>
                    </Box>
               </RoomsProvider>
          </ModalTabsProvider>
     );
};
