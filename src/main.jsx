import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./auth";
import { IspeakAdmin } from "./IspeakAdmin";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles.css";
import { AppTheme } from "./theme";
import { SideBarProvider } from "./ispeak/context";

ReactDOM.createRoot(document.getElementById("root")).render(
     <React.StrictMode>
          <Router>
               <AuthProvider>
                    <SideBarProvider>
                         <AppTheme>
                              <IspeakAdmin />
                         </AppTheme>
                    </SideBarProvider>
               </AuthProvider>
          </Router>
     </React.StrictMode>
);
