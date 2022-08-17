import { authTypes } from "./types/authTypes";


export const authReducer = (state, action) => {
  switch (action.type) {
    case authTypes.login:
        return {
            ...state,
            logged: true
        }  
    default:
        return state
  }
}
