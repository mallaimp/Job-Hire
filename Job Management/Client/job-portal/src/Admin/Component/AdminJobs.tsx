import React, { useEffect, useState } from "react";
import Navabar from "../../Layouts/AdminNavbar";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Container, ModalTitle, Table } from "react-bootstrap";
import JobsServices from "../Services/JobsServices";
import { UserView } from "../../Login/Model/UserView";
import { AuthUtil } from "../../Util/AuthUtil";
import {useNavigate , Link} from "react-router-dom";
import { IJObs } from "../Model/IJobs";
import LogRegService from "../../Login/Services/LogRegService";

interface IProps{}
interface IState{}

let AdminJobs:React.FC<IProps> =() =>{
    let [user, setUser] = useState<UserView>();
    let [success, setSuccess] = useState("");
    useEffect(()=>{
        LogRegService.userAuthenticate().then((response:any)=>{
            let results:any = response.data.user;
            setSuccess(response.data.msg);
            setUser(results);
        }).catch((error)=>{
            console.log(error);
        })
        if(user?.isAdmin === false){
            navigate("/admin/login");
        }
        if(!AuthUtil.isLoggedIn()){
            navigate("/admin/login");
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
    },[success]);
    
    let deleteJob = (jobId:any) =>{
        JobsServices.deleteJob(jobId).then((response: any)=>{
            setSuccess(response.data.message);
        }).catch((error: any)=>{
            console.log(error);
        })
    }

    return(
        <>
            <Navabar/>  
            <div className="grid mt-4">
                <div className="container">
                     <div className="row mt-5 mb-5">
                        <div className="col">
                            <div className="card shadow-lg">
                                <div className="card-body">
                                
                                <div className="row">
                                    <div className="col-sm-11">
                                        <h1>Job Details</h1>
                                    </div>
                                    <div className="col-sm-1">
                                        <Link to="/admin/jobs/add" className="btn btn-success">+</Link>
                                    </div>
                                </div>
                                <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th><p className="text-center">Title</p></th>
                                                <th><p className="text-center">Company</p></th>
                                                <th><p className="text-center">Location</p></th>
                                                <th><p className="text-center">Experiance</p></th>
                                                <th><p className="text-center">Skills</p></th>
                                                <th><p className="text-center">Action</p></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                jobs.length==0 &&
                                                <tr>
                                                    <td className="text-center" colSpan={7}>No Data Found</td>
                                                </tr>
                                            }
                                            {
                                                jobs.map((job)=>{
                                                    return (
                                                        <tr key={job._id}>
                                                            <td><p className="text-center">{job.title}</p></td>
                                                            <td><p className="text-center">{job.company}</p></td>
                                                            <td><p className="text-center">{job.location}</p></td>
                                                            <td><p className="text-center">{job.experiance}</p></td>
                                                            <td><p className="text-center">{job.skills}</p></td>
                                                            
                                                            <td>
                                                                <span className="text-center"><i onClick={()=>deleteJob(job._id)} className="fa fa-trash" aria-hidden="true"></i></span>
                                                                &nbsp;&nbsp;<Link to={`/admin/jobs/update/${job._id}`}><i className="fa fa-pencil" aria-hidden="true"></i></Link>

                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

export default AdminJobs;