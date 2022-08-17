import { ListItem, ListItemButton } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { SideBarContext } from "../context";

export const SideBarItem = ({ title, icon, url = '' }) => {
     const { isBarExtended } = useContext(SideBarContext);
     return (
          <NavLink
               className={({ isActive }) => (isActive ? "link-active" : "")}
               style={{ textDecoration: "none" }}
               to={url}
          >
               <ListItem
                    sx={{
                         color: "primary.light",
                         "& .MuiButtonBase-root": {
                              padding: "15px 0",
                              paddingLeft: 2,
                              height: "54px",
                         },
                         "&:hover": {
                              background: "#5df99c",
                              color: "primary.dark",
                         },
                         padding: 0,
                         transition: "all 0.2s ease",
                    }}
               >
                    <ListItemButton>
                         {icon}
                         {isBarExtended && title}
                    </ListItemButton>
               </ListItem>
          </NavLink>
     );
};
