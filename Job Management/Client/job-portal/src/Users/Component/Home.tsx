import React, { useEffect, useState } from "react";
import Navabar from "../../Layouts/Navabar";
import { UserView } from "../../Login/Model/UserView";
import { AuthUtil } from "../../Util/AuthUtil";
import {useNavigate} from "react-router-dom";
import LogRegService from "../../Login/Services/LogRegService";


interface IProps{}
interface IState{}

let Home:React.FC<IProps> =() =>{
    const navigate = useNavigate();
    let [user, setUser] = useState<UserView>();
    useEffect(()=>{
        LogRegService.userAuthenticate().then((response:any)=>{
            let results:any = response.data.user;
            setUser(results);
        }).catch((error)=>{
            console.log(error)
        })
        if(!AuthUtil.isLoggedIn()){
            navigate("/") 
        }
        if(user?.isAdmin){
           navigate("/") 
        }
    },[])
    return(
        <>
          <Navabar/>  
          <div className="wrapper">
                <div className="landing">
                    <div className="d-flex flex-column justify-content-center text-center align-items-center h-75 d-inline-block">
                    </div>
                </div>
            </div>
           
        </>
    );

}

export default Home;