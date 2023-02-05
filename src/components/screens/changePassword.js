import React, {useState} from 'react'

import { MDBContainer, MDBCol, MDBRow, MDBCard, MDBCardBody, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import '../../styles/login.css'

import { useNavigate, Link } from 'react-router-dom';
import M from 'materialize-css'

const   ChangePassword = () => {
    const navigate = useNavigate()
    const [password, setPassword] = useState("")
    
    const email = localStorage.getItem("email");

    const changePassword = (e) =>{
        fetch("https://visualizealgos-backend.onrender.com/changePassword",{
            method : "post",
            headers : {
                "Content-Type" : "application/json",
            },
            body:JSON.stringify({
                password,
                email
            })

        })
        .then(res => res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error, classes:"#c62828 red darken-3"})
                localStorage.removeItem("email")
                navigate('/signup')
            }
            else{
                M.toast({html: data.message, classes:"#43a047 green darken-1"})
                localStorage.removeItem("email")
                navigate('/')
            }
        }).catch(err=>{
            console.log(err)
        })
        
        e.preventDefault();

    }


    return (
        <>
            <div class="login">
            <div></div>
            <div>
            <MDBContainer fluid className="p-3 my-5">

                <MDBRow>

                    <MDBCol col='10' md='6'>
                        <img src="back2.png" class="img-fluid" alt="Sample image" />
                    </MDBCol>

                    <MDBCol col='4' md='6'>

                        <MDBContainer className="p-3 my-5 d-flex flex-column ">
                            <div className='mask gradient-custom-3'></div>
                            <MDBCard className='m-0' >
                            <MDBCardBody className='px-4'>
                                <h2 className="text-uppercase text-center mb-4">Password Change</h2>
                                <form method='post' onSubmit={changePassword}>
                                {/* <MDBInput wrapperClass='mb-3' label='Enter Otp' type="number" maxLength={6} minLength={6} name='otp' id='form1' value={otp} onChange={(e)=>setOtp(e.target.value)} required/> */}
                                <MDBInput wrapperClass='mb-2' label='Password' name='password' id='form2' type='password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>

                                {/* <div className="d-flex justify-content-between mx-2 mb-3">
                                <div></div>
                                <a href="!#">Forgot password?</a>
                                </div> */}

                                <input className="input_ele" type="submit" value="Change Password" />
                                </form>
                                {/* <MDBBtn className="mb-4">Sign in</MDBBtn> */}

                                <div className="text-center">
                                <div className="signin register">
                                    <span>Have already an account ? </span>
                                    {/* <a role="button" href="/signup" id="signup">
                                        Sign up
                                    </a> */}
                                    <Link to="/"> Register Here</Link>
                                </div>
                                
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
    )
}

export default ChangePassword