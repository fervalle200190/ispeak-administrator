import { authTypes } from "./types/authTypes";

export const authReducer = (state, action) => {
     switch (action.type) {
          case authTypes.login:
               return {
                    ...state,
                    logged: true,
               };
          case authTypes.logout:
               return {
                    ...state,
                    logged: false,
               };
          default:
               return state;
     }
};
