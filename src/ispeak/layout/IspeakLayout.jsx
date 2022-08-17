import { Box, Button } from "@mui/material";
import { MenuRounded } from "@mui/icons-material";
import { useContext } from "react";
import { SideBar } from "../components";
import { SideBarContext } from "../context";

export const IspeakLayout = ({ children }) => {
     const { isBarExtended, handleDrawer } = useContext(SideBarContext);
     const drawerWidth = isBarExtended ? 310 : 62;
     return (
          <Box sx={{ display: "flex" }}>
               <Button
                    size="large"
                    sx={{
                         position: "fixed",
                         top: 10,
                         left: 10,
                         zIndex: 1000,
                         display: { md: "none" },
                    }}
                    onClick={handleDrawer}
               >
                    <MenuRounded />
               </Button>
               <SideBar drawerWidth={drawerWidth} />
               <Box component="main" sx={{ flexGrow: 1, pt: 3, pl: {xs: 0, sm: 3} }}>
                    {children}
               </Box>
          </Box>
     );
};
