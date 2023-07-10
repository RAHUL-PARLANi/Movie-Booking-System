import React, { useState } from 'react'
import Form from "react-bootstrap/Form";

const AdminLogin = () => {
const [email,setEmail]=useState("");
const [password,setPassword]=useState("")

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
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>   
          <button className="btn btn-primary mt-3 ms-2"> Login </button>
      </Form>

    </div>
  )
}

export default AdminLogin