import { useContext } from "react";
import { AuthContext, AuthRoutes } from "../auth";
import { IspeakRoutes } from "../ispeak";

export const AppRouter = () => {
     const { logged } = useContext(AuthContext);
     return (
          <>
               {logged ? (
                    <>
                         <IspeakRoutes />
                    </>
               ) : (
                    <>
                         <AuthRoutes />
                    </>
               )}
          </>
     );
};
