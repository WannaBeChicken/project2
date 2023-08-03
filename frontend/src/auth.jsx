import { useUserContext } from "./components/userContex"
import { Navigate } from "react-router-dom";

export const Auth = ({ children }) =>{
    const userContex = useUserContext();
    console.log(userContex.user);
    if(!userContex.user){
        return <Navigate to="/" />
    }

    return children;
}