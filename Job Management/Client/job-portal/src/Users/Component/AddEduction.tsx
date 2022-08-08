import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import Navabar from '../../Layouts/Navabar';
import { UserView } from '../../Login/Model/UserView';
import LogRegService from '../../Login/Services/LogRegService';
import { AuthUtil } from '../../Util/AuthUtil';
import { IEducation, IExperience, IProfile } from '../Models/IProfile';
import { ProfileService } from '../Services/ProfileService';


interface IProps {
}

let AddEducation: React.FC<IProps> = ({}) => {
   
    const navigate = useNavigate();
    let [basics,setBasics] = useState<IProfile>({} as IProfile);
    let [experiance,setExperiance] = useState<IExperience[]>([] as IExperience[]);
    
    let [user, setUser] = useState<UserView>();
   
    const [validated, setValidated] = useState(false);

    const [education, setEducation] = useState<IEducation>({
        school: "",
        fieldOfStudy: "",
        degree: "",
        description: "",
        passout: ""
    });

    const updateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEducation((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value,
            }
        })
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            ProfileService.addEducation(education).then((response)=>{
                navigate("/profile");
            }).catch((error)=>{
                console.log(error);
            })
        }
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    useEffect(()=>{
        LogRegService.userAuthenticate().then((response:any)=>{
            let results:any = response.data.user;
            setUser(results);
        }).catch((error)=>{
            console.log(error)
        })
        if(!AuthUtil.isLoggedIn()){
            navigate("/");
        }
        if(user?.isAdmin){
           navigate("/") 
        }
    },[])

   
    return (
        <>
            <Navabar/>
            <Container className="mt-3">
                <Row>
                    <Col>
                        <h3 className="text-success">
                            <i className="fa fa-graduation-cap"></i> Add Education
                        </h3>
                        <p className="fst-italic">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium
                            ad adipisci, assumenda atque deleniti deserunt dolorem doloribus maxime neque, odit placeat
                            quas quibusdam quidem quis quisquam quos reprehenderit similique ut!</p>
                    </Col>
                </Row>

                <Row>
                    <Col xs={4}>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <InputGroup className="mb-2">
                                <InputGroup.Text id="basic-addon1"
                                    className="bg-light-green text-dark">School</InputGroup.Text>
                                <Form.Control
                                    value={education.school}
                                    name={'school'}
                                    onChange={updateInput}
                                    type="text"
                                    placeholder="school"
                                    required
                                />
                                <Form.Control.Feedback>
                                    Looks Good!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please choose a valid school.
                                </Form.Control.Feedback>
                            </InputGroup>
                            <InputGroup className="mb-2">
                                <InputGroup.Text id="basic-addon1"
                                                 className="bg-light-green text-dark">Field Of Study</InputGroup.Text>
                                <Form.Control
                                    required
                                    value={education.fieldOfStudy}
                                    name={'fieldOfStudy'}
                                    onChange={updateInput}
                                    type="text"
                                    placeholder="fieldOfStudy"
                                />
                                <Form.Control.Feedback>
                                    Looks Good!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please choose a valid fieldOfStudy.
                                </Form.Control.Feedback>
                            </InputGroup>
                            <InputGroup className="mb-2">
                                <InputGroup.Text id="basic-addon1"
                                                 className="bg-light-green text-dark">Degree</InputGroup.Text>
                                <Form.Control
                                    required
                                    value={education.degree}
                                    name={'degree'}
                                    onChange={updateInput}
                                    type="text"
                                    placeholder="degree"
                                />
                                <Form.Control.Feedback>
                                    Looks Good!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please choose a valid degree.
                                </Form.Control.Feedback>
                            </InputGroup>
                            <InputGroup className="mb-2">
                                <InputGroup.Text id="basic-addon1" className="bg-light-green text-dark">Passout Year</InputGroup.Text>
                                <Form.Control
                                    required
                                    value={education.passout}
                                    name={'passout'}
                                    onChange={updateInput}
                                    type="text"
                                    placeholder="Passout"
                                />
                                <Form.Control.Feedback>
                                    Looks Good!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please choose a valid Passout.
                                </Form.Control.Feedback>
                            </InputGroup>
                            <InputGroup className="mb-2">
                                <InputGroup.Text id="basic-addon1"
                                                 className="bg-light-green text-dark">Description</InputGroup.Text>
                                <Form.Control
                                    value={education.description}
                                    name={'description'}
                                    onChange={updateInput}
                                    as="textarea" rows={3}
                                    placeholder="Description"
                                />
                                {/* <Form.Control.Feedback>
                                    Looks Good!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please choose a valid Description.
                                </Form.Control.Feedback> */}
                            </InputGroup>
                            <Button variant="success" type="submit" className="me-1">
                                Add Education
                            </Button>
                            <Link to={'/profile/'}>
                                <Button variant="dark" type="button">
                                    Cancel
                                </Button>
                            </Link>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
};
export default AddEducation;