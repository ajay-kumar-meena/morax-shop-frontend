
import { Children } from "react"
import { Navigate, Outlet } from "react-router-dom"


const ProtectedRoute = ({
    isAuthenticated,
    children,
    isAdmin,
    adminRoute,
    redirect="/login",
    redirectAdmin="/"

})=>{


     if(!isAuthenticated){
         return <Navigate to={redirect} />
     }

     if(adminRoute && !isAdmin){
         return <Navigate to={redirectAdmin} />
     }


     return children ? children : <Outlet />; 

}


export default ProtectedRoute;
