import React, { useState } from 'react'
import Form from "react-bootstrap/Form";
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { login } from '../../features/user';

const UserLogin = () => {
const [email,setEmail]=useState("");
const [password,setPassword]=useState("")
const [userName,setUserName]=useState("")

const dispatch = useDispatch();

const handleSubmit=()=>{
      
      axios.post('http://localhost:5000/login',{password:password,emailId:email}).then(elem=>{
          if(elem.data.message){
            alert(elem.data.message)
          }else{
            dispatch(login({
              emailId: elem.data.emailId,
              role: elem.data.role,
              userId: elem.data.userId,
              userName: elem.data.userName
            }))
          }
      }).catch(err=>console.log('Something went Wrong'))
}

const handleRegister=()=>{
      
    axios.post('http://localhost:5000/register',{userName:userName,password:password,emailId:email, role:'user'}).then(elem=>{
        if(elem.data.message){
          alert(elem.data.message)
        }
    }).catch(err=>console.log('Something went Wrong'))
}

const [page,setPage]=useState(0);

if(page==0){
    return (

        <div className='container-fluid'>
            <Form
            className="p-4 px-6 border-2 border border-primary rounded mb-3"
            style={{
              fontWeight: 600,
              width: "75%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <h3 className="border-bottom border-primary border-3 mb-3">
              Login
            </h3>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                className="border border-primary border-2"
                type="email"
                value={email}
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                className="border border-primary border-2"
                value={password}
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>   
              <button onClick={(e)=>{e.preventDefault()
              handleSubmit()
              }} className="btn btn-primary mt-3 ms-2"> Login </button>
              
              <button onClick={(e)=>{
                e.preventDefault()
                setPage(1)
              }} className="btn btn-outline-primary mt-3 ms-2"> Register here </button>
              
          </Form>
    
        </div>
      )
    }
if(page==1){
    return (

        <div className='container-fluid'>
            <Form
            onSubmit={(e)=>{
                e.preventDefault()
                handleRegister()
            }}
            className="p-4 px-6 border-2 border border-primary rounded mb-3"
            style={{
              fontWeight: 600,
              width: "75%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <h3 className="border-bottom border-primary border-3 mb-3">
              Register
            </h3>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>userName</Form.Label>
              <Form.Control
                className="border border-primary border-2"
                type="text"
                value={userName}
                required
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                className="border border-primary border-2"
                type="email"
                value={email}
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                className="border border-primary border-2"
                value={password}
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>   
              <button className="btn btn-primary mt-3 ms-2"> Register </button>
              
              <button onClick={()=>{setPage(0)
              }} className="btn btn-outline-primary mt-3 ms-2"> Login here </button>
              
          </Form>
    
        </div>
      )
}
}

export default UserLogin