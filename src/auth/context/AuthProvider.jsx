import { useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";
import { authTypes } from "./types/authTypes";

const init = ()=> {
     return {
          logged: !!localStorage.getItem('LoggedUser')
     }
}

export const AuthProvider = ({ children }) => {
     const [state, dispatch] = useReducer(authReducer, { logged: false }, init);

     const handleLogin = () => {
          dispatch({ type: authTypes.login });
     };

     const handleLogout = ()=> {
          dispatch({ type: authTypes.logout });
     }
     return (
          <AuthContext.Provider value={{ logged: state.logged, handleLogin, handleLogout }}>
               {children}
          </AuthContext.Provider>
     );
};
