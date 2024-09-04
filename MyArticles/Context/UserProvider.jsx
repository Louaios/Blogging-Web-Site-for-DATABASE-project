import { createContext, useReducer } from "react";

export const userContext = createContext();
const UserProvider = (props) => {
    const fetchuser = localStorage.getItem('user') ? 
    JSON.parse(localStorage.getItem('user'))[0] : [];

    const userReducer = (state , action) => {
        switch(action.type){
            case "LOG_OUT":
                localStorage.removeItem('user')
                state = []
                return state;
            case "AUTH":
                state = localStorage.getItem('user') ? 
                JSON.parse(localStorage.getItem('user'))[0] : [];
                return state;
            default:
            return state; 
            
        }
    }

    const [user , dispatch] = useReducer(userReducer ,fetchuser)
    return ( 
    <userContext.Provider value={{user , dispatch}}>
     {props.children}
    </userContext.Provider>
     );
}
 
export default UserProvider;