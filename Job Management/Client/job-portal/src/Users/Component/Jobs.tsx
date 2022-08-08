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

let Jobs:React.FC<IProps> =() =>{
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
            navigate("/");
        }
    },[])

    const navigate = useNavigate();

    let [jobs,setJobs] = useState<IJObs[]>([] as IJObs[]);

    useEffect(()=>{
        JobsServices.getAllJObs().then((response: any)=>{
            setJobs(response.data.jobs);
        }).catch((error: any)=>{
            console.log(error);
        })
    },[]);

    let applyJob = (jobId:any) =>{
        let appliedData = {
            jobId:jobId
        }
        let selectedData = jobs.filter(job=>job._id == jobId);
        JobsServices.applyJOb(appliedData).then((response)=>{
            navigate("/myjobs");
        }).catch((error)=>{
            console.log(error);
        })
    }
   
    return(
        <>
            <Navabar/>  
            <div className="conatiner m-5">
                <h3>Lets Search Dream Job</h3>
                <div className="row">
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
                                            <div className="position-absolute bottom-0 end-50 m-4">
                                                <button onClick={()=>applyJob(job._id)} className="btn btn-primary">Apply</button>
                                            </div>
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

export default Jobs;