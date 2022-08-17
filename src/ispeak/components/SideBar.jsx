import { MenuRounded, CloseRounded } from "@mui/icons-material";
import { Box, Button, Drawer, Grid, List, Typography } from "@mui/material";
import { useContext } from "react";
import { SideBarContext } from "../context";
import { sideNavItems } from "../utils/sideNavItems";
import { SideBarItem } from "./SideBarItem";

export const SideBar = ({ drawerWidth }) => {
     const { handleBar, isBarExtended, size, isDrawerOpen, handleDrawer } =
          useContext(SideBarContext);
     return (
          <Box
               component={"div"}
               sx={{
                    minWidth: { xs: 0, md: drawerWidth },
                    transition: "all 0.2s ease-in-out",
               }}
          >
               <Drawer
                    variant={`${size < 900 ? "temporary" : "permanent"}`}
                    open={isDrawerOpen}
                    onClose={handleDrawer}
                    sx={{
                         display: { xs: "block" },
                         "& .MuiDrawer-paper": {
                              boxSizing: "border-box",
                              width: drawerWidth,
                              paddingTop: 4,
                              transition: "width 0.2s ease-in-out",
                         },
                    }}
               >
                    <Grid
                         container
                         onClick={handleBar}
                         sx={{ cursor: "pointer" }}
                    >
                         <MenuRounded
                              sx={{
                                   color: "primary.light",
                                   ml: "14px",
                                   display: { xs: "none", md: "block" },
                              }}
                         />
                         <CloseRounded
                              sx={{
                                   color: "primary.light",
                                   ml: "14px",
                                   display: { xs: "block", md: "none" },
                              }}
                              onClick={handleDrawer}
                         />
                    </Grid>
                    {/* <Typography variant="h3" color="primary.light">
                         Ispeak
                    </Typography> */}
                    <List sx={{ paddingTop: 5 }}>
                         {sideNavItems.map((sideNavItem, i) => (
                              <SideBarItem key={i} {...sideNavItem} />
                         ))}
                    </List>
               </Drawer>
          </Box>
     );
};
