import React, {useState, useContext} from 'react';

import { MDBContainer, MDBCol, MDBRow, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';

import '../../styles/login.css'
import M from 'materialize-css'

import {UserContext} from '../../App'

const Login = () => {
    const {state, dispatch} = useContext(UserContext)
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const CheckData = () =>{
        fetch("/signin",{
            method : "post",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                email,
                password
            })

        })
        .then(res => res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
                console.log(data.error)
                M.toast({html: data.error, classes:"#c62828 red darken-3"})
            }
            else{
                localStorage.setItem("jwt", data.token)
                localStorage.setItem("user", JSON.stringify(data.user))
                dispatch({type:"USER", payload: data.user})
                console.log("Successfully signedin !!")
                M.toast({html: "Successfully signedin !!!", classes:"#43a047 green darken-1"})
                
                navigate('/home')
            }
        }).catch(err=>{
            console.log(err)
        })
    
    }

    const forget = () =>{
        navigate('/forgettenPassword')
    }
    
    return (
        <>
        <div className="login">
            <div></div>
            <div>
            <MDBContainer fluid className="p-3 my-5">

                <MDBRow>

                    <MDBCol col='10' md='6'>
                        {/* <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" /> */
                        <img src="back2.png" className="img-fluid" alt="Sample image" />
                        }
                    </MDBCol>

                    <MDBCol col='4' md='6'>

                        <MDBContainer className="p-3 my-5 d-flex flex-column ">
                            <div className='mask gradient-custom-3'></div>
                            <MDBCard className='m-0' >
                            <MDBCardBody className='px-4'>
                                <h2 className="text-uppercase text-center mb-4">Welcome</h2>

                                <MDBInput wrapperClass='mb-3' label='Email address' name='email' id='form1' type='email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                                <MDBInput wrapperClass='mb-2' label='Password' name='password' id='form2' type='password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>

                                <div className="d-flex justify-content-between mx-2 mb-3">
                                <div></div>
                                <a onClick={()=>forget()}>Forgot password?</a>
                                </div>

                                <input className="input_ele" type="submit" value="Login" onClick={()=>CheckData()} />
                                {/* <MDBBtn className="mb-4">Sign in</MDBBtn> */}

                                <div className="text-center">
                                <div className="signin register">
                                    <span>Not a member ? </span>
                                    {/* <a role="button" href="/signup" id="signup">
                                        Sign up
                                    </a> */}
                                    <Link to="/signup">     Register</Link>
                                </div>
                                {/* <p>or sign up with:</p> */}

                                {/* <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
                                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                    <MDBIcon fab icon='facebook-f' size="sm"/>
                                    </MDBBtn>

                                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                    <MDBIcon fab icon='twitter' size="sm"/>
                                    </MDBBtn>

                                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                    <MDBIcon fab icon='google' size="sm"/>
                                    </MDBBtn>

                                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                    <MDBIcon fab icon='github' size="sm"/>
                                    </MDBBtn>

                                </div> */}
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

export default Login;
