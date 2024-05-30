import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
export default function privaterouter() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const current=useSelector((state)=>state.user.currentuser);
    return (
    current?<Outlet/>:<Navigate to='/signin'/>)
}
