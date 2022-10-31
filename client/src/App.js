import React, {useEffect, useContext, createContext, useReducer} from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'

import Login from './components/screens/login.js';
import Signup from './components/screens/signup.js';
import ForgetPassword from './components/screens/forgetPassword.js';
import ChangePassword from './components/screens/changePassword.js';
import Home from './components/screens/home.js';

import {reducer, initialState} from './reducers/userReducer'
export const UserContext = createContext()

const Routing = ()=>{

  const navigate = useNavigate()
  const {state, dispatch} = useContext(UserContext)

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER", payload: user})
      // console.log(user)
      // navigate('/home')
    }
    else{
      navigate('/')
    }
  }, []);

  return(
    <Routes>
        <Route exact path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgettenPassword' element={<ForgetPassword />}/>
        <Route path='/changePassword' element={<ChangePassword />}/>
        <Route path='/home' element={<Home />}/>
    </Routes>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{state, dispatch}}>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
