import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput
} from 'mdb-react-ui-kit';
import logo from "../assets/images/logos/label.jpeg";

const FullLayout = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate(); // Hook to get navigation function

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/login', {
        email,
        password
      });
      console.log('Login successful:', response.data);
      
      const token = response.data.token;
     
    // Store token in localStorage
      localStorage.setItem('token', token);
      // Set login success state to true
      setLoginSuccess(true);
      // Clear any previous error messages
      setLoginError(null);
      // Redirect to dashboard upon successful login
      navigate('/inventory'); // Use navigate function to redirect
    } catch (error) {
      console.error('Login failed:', error.response.data);
      // Set login success state to false
      setLoginSuccess(false);
      // Set login error message
      setLoginError('Authentication failed. Please try again.');
    }
  };

  return (
    <MDBContainer fluid>
      <div className="p-5 bg-image" style={{backgroundImage: `url(${logo})`, height: '400px' }}></div>
      <MDBCard className='mx-5 mb-5 p-5 shadow-5' style={{marginTop: '-100px', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)'}}>
        <MDBCardBody className='p-5 text-center'>
          <h2 className="fw-bold mb-5">Welcome to Ekara Robots</h2>
          <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <MDBBtn className='w-100 mb-4' size='md' onClick={handleLogin}  color="success">Start Now</MDBBtn>
          {/* Conditionally render success or error message */}
          {loginSuccess && <p className="text-success">Login successful!</p>}
          {loginError && <p className="text-danger">{loginError}</p>}
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default FullLayout;
