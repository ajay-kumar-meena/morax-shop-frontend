import { useEffect } from "react"
import axios from "axios";
import { userNotExist } from "../store/slices/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const logoutUser = async () => {
            const res = await axios.get(`http://localhost:3000/api/v1/user/logout`,
                {
                    withCredentials: true,
                }
            )
            dispatch(userNotExist());
            toast.success("Logout successfully")
            setTimeout(()=>{
                navigate('/');
            },1000)
        }
        logoutUser();
    });

    return 
    (<>
     <div>This is Logout Page</div>
     </>)

}

export default Logout