import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import Constant from "../utils/constant";
import { toast } from 'react-toastify';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if((Constant.dummyUser1 == email || Constant.dummyUser2 == email) && Constant.password == password){
        if(Constant.dummyUser2 == email){
            sessionStorage.setItem("getUserType", true);
        }else{
            sessionStorage.setItem("getUserType", false);
        }
        sessionStorage.setItem("isLogin", true);
        sessionStorage.setItem("userId", Constant.userId);
        sessionStorage.setItem("userName",  Constant.userId);
        sessionStorage.setItem("email", email);

         previousScreen()
    }else{
        toast.error("Wrong User ID or Password");
    }
  }

  const previousScreen = () => navigate(-1);

  return (
    <div >
          
    <CloseIcon className="float-end me-4"  onClick={() => previousScreen()} />


    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoComplete="off"
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password" className="mt-4">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
         <Button  size="lg" type="submit" disabled={!validateForm()} className="mt-4 custom">
          Login
        </Button>
      </Form>
    </div>
    </div>
  );
}