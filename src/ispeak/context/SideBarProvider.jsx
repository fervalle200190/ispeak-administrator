import { useEffect, useState } from "react";
import { SideBarContext } from "./SideBarContext";

export const SideBarProvider = ({ children }) => {
     const [size, setSize] = useState(window.innerWidth);
     const [isBarExtended, setIsBarExtended] = useState(true);
     const [isDrawerOpen, setIsDrawerOpen] = useState(false);

     const handleBar = () => {
          if (size <= 900) return;
          setIsBarExtended(!isBarExtended);
     };
     const handleDrawer = () => {
          setIsDrawerOpen(!isDrawerOpen);
     };
     useEffect(() => {
          window.addEventListener("resize", () => {
               setSize(window.innerWidth);
               if (window.innerWidth <= 900) {
                    setIsBarExtended(true);
               }
          });
     }, []);

     return (
          <SideBarContext.Provider
               value={{
                    size,
                    handleBar,
                    isBarExtended,
                    handleDrawer,
                    isDrawerOpen,
               }}
          >
               {children}
          </SideBarContext.Provider>
     );
};
