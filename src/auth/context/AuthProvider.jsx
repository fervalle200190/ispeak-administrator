import { useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";
import { authTypes } from "./types/authTypes";

export const AuthProvider = ({ children }) => {
     const [state, dispatch] = useReducer(authReducer, { logged: true });

     const handleLogin = () => {
          dispatch({ type: authTypes.login });
     };
     return (
          <AuthContext.Provider value={{ logged: state.logged, handleLogin }}>
               {children}
          </AuthContext.Provider>
     );
};
