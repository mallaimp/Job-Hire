import React, { useEffect, useState } from "react";
import Navabar from "../../Layouts/Navabar";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Container, ModalTitle } from "react-bootstrap";
import { IJObs } from "../Models/IJobs";
import JobsServices from "../Services/JobsServices";
import { UserView } from "../../Login/Model/UserView";
import { AuthUtil } from "../../Util/AuthUtil";
import {useNavigate} from "react-router-dom";
import LogRegService from "../../Login/Services/LogRegService";

interface IProps{}
interface IState{}

let MyJobs:React.FC<IProps> =() =>{
    let [user, setUser] = useState<UserView>();
    const navigate = useNavigate();
    useEffect(()=>{
        LogRegService.userAuthenticate().then((response:any)=>{
            let results:any = response.data.user;
            setUser(results);
        }).catch((error)=>{
            console.log(error)
        })
        if(user?.isAdmin){
            navigate("/");
        }
        if(!AuthUtil.isLoggedIn()){
            navigate("/") 
        }
    },[])

    let [jobs,setJobs] = useState<IJObs[]>([] as IJObs[]);

    useEffect(()=>{
        JobsServices.getApplyJOb(user?._id).then((response: any)=>{
            setJobs(response.data.job);
            console.log(response.data.job);
        }).catch((error: any)=>{
            console.log(error);
        })
    },[user]);

    return(
        <>
            <Navabar/>  
            <div className="container mt-3">
                <h3>Applied Jobs</h3>
                <div className="row">
                    {
                        Object.keys(jobs).length == 0 && 
                        <p className="text-center fw-bolder">No Data Found</p>
                    }
                    {
                        jobs.map((job)=>{
                            return(
                                <div className="col-sm-6 d-flex align-items-stretch mt-3" key={job._id}>
                                    <div className="card shadow-lg">
                                        <div className="card-body">
                                            <p className="text-center fw-bolder">{job.title}</p>
                                            <p className="text-center"><i className='fas fa-landmark'></i>&nbsp;{job.company}</p>
                                            <p><i className="fa fa-suitcase" aria-hidden="true">&nbsp;&nbsp;</i>{job.experiance}
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <span className="fa-stack">
                                                <i className="fa fa-circle-thin fa-stack-2x"></i>
                                                <i className="fa fa-map-marker fa-stack-1x"></i>
                                                </span>&nbsp;&nbsp;{job.location} 
                                            </p>
                                            <p className="text">{job.skills}</p>
                                            <p><i className="far fa-file-alt" aria-hidden="true"></i>&nbsp;{job.description}</p>
                                            <br></br><br></br>
                                            
                                        </div>
                                        
                                    </div>
                                </div>
                            )
                        })   
                    }
                </div>
            </div>
        </>
    );

}

export default MyJobs;