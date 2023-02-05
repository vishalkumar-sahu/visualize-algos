import React, {useState} from 'react';

import { MDBContainer, MDBCol, MDBRow, MDBCard, MDBInput, MDBCheckbox, MDBCardBody } from 'mdb-react-ui-kit';

import { Link, useNavigate } from 'react-router-dom';
import M from 'materialize-css'

import '../../styles/signup.css'

const Signup = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    
    const PostData = (e) =>{

        if(! /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/.test(username)){
            console.log("Invalid UserName")
            M.toast({html: "Invalid UserName", classes:"#c62828 red darken-3"})
        }
        else{
            fetch("https://visualizealgos-backend.onrender.com/signup",{
                method : "post",
                // mode: "cors",
                headers : {
                    // "Access-Control-Allow-Origin" : "*",
                    "Content-Type" : "application/json",
                },
                body:JSON.stringify({
                    email,
                    name,
                    username,
                    password
                })
    
            })
            .then(res => res.json())
            .then(data=>{
                // navigate('/verify')
                // console.log("send mail");
                // if(data.message != undefined){
                //     // console.log(data.message);
                //     // M.toast({html: data.message, classes:"#43a047 green darken-1"});
                //     navigate('/verify');
                    
            
                // }
                // else{
                //     M.toast({html: data.error, classes:"#c62828 red darken-3"})
                //     navigate('/');
                //     // console.log(data.error);
                // }
                if(data.error){
                    M.toast({html: data.error, classes:"#c62828 red darken-3"})
                }
                else{
                    M.toast({html: data.message, classes:"#43a047 green darken-1"})
                    navigate('/')
                }
            }).catch(err=>{
                console.log(err)
            })

            e.preventDefault();

        }

    }

    
    return (
        <>
        <div className="login">
            <div></div>
            <div>
            <MDBContainer fluid className="p-3 mt-5 mb-3">

                <MDBRow>

                    <MDBCol col='10' md='6'>
                        <img src="back2.png" className="img-fluid" alt="Sample image" />
                    </MDBCol>

                    <MDBCol col='4' md='6'>

                        <MDBContainer>
                            <div className='mask gradient-custom-3'></div>
                            <MDBCard className='m-0' >
                                <MDBCardBody className='px-4'>
                                <form method='post'  onSubmit={PostData}>
                                <h2 className="text-uppercase text-center mb-4">Create an account</h2>
                                <MDBInput wrapperClass='mb-2' label='UserName' name='username' size='lg' id='form1' type='text' value={username} onChange={(e)=>setUsername(e.target.value)} required/>
                                <MDBInput wrapperClass='mb-2' label='Your Name' name='name' size='lg' id='form1' type='text' value={name} onChange={(e)=>setName(e.target.value)} required/>
                                <MDBInput wrapperClass='mb-2' label='Your Email' name='email' size='lg' id='form2' type='email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                                <MDBInput wrapperClass='mb-2' label='Password' name='password' size='lg' id='form3' type='password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                                {/* <MDBInput wrapperClass='mb-2' label='Repeat your password' size='lg' id='form4' type='password'/> */}
                                <div className='d-flex flex-row justify-content-center mb-4'>
                                    <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I agree all statements in Terms of service' />
                                </div>
                                <input id='submitsignup' className="input_ele" type="submit" value="Sign Up" />
                                </form>
                                {/* <MDBBtn className='mb-3 w-100 gradient-custom-2' size='lg'>Register</MDBBtn> */}

                                <div className="signin register">
                                    <span>Have already an account ? </span>
                                    {/* <a role="button" href="/signup" id="signup">
                                        Sign up
                                    </a> */}
                                    <Link to="/">Login Here</Link>
                                </div>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBContainer>

                    </MDBCol>

                </MDBRow>

            </MDBContainer>
            </div>
            <div></div>
        </div>
        </>
    );
};

export default Signup;
