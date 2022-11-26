import * as React from 'react';
import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Stack from '@mui/material/Stack';


function SignUp(props) {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [responseServer, setResponse] = useState({}) // the API will return an object with a JWT token, if the user logs in successfully

  useEffect(() => {
    // if the user is logged-in, save the token to local storage
    if (responseServer.success && responseServer.token) {
      console.log(`User successfully registered: ${responseServer.emailID}`)
      console.log(responseServer.token)
      localStorage.setItem('token', responseServer.token) // store the token into localStorage
      navigate('/UserProfile')
    }
  
  }, [responseServer, navigate])

  return (
      <Box sx={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: 'calc(100vh - 53px)' }}>

        <Box justifyContent="center" alignItems="center" sx={{mx: 'auto'}}>

          <Box sx={{ marginTop: '20vh' }}></Box>
          <Stack spacing={1} direction="column" alignItems="center" sx={{ m:1, minWidth: 290 }}>
            <TextField fullWidth label="Fullname" id="fullname" sx={{ m: 1}} />
            <TextField fullWidth label="Email ID" id="email" sx={{ m: 1}} />
            <TextField fullWidth label="Phone Number" id="phone" sx={{ m: 1 }} />
            <TextField fullWidth type={showPassword ? "text" : "password"} label="Password" id="password" sx={{ m: 1 }} />
            <TextField fullWidth type={showPassword ? "text" : "password"} label="Confirm Password" id="passwordConf" sx={{ m: 1 }} />
          </Stack>
          
          <Stack spacing={2} direction= "column" alignItems="center" >
            <VisibilityIcon onClick={() => setShowPassword(s => !s)} sx={{cursor: 'pointer'}}/>
            <Button color="success" sx={{ m: 2 }} 
              onClick={ async () => {
                let fullname = document.getElementById('fullname').value
                let emailID = document.getElementById('email').value
                let password = document.getElementById('password').value
                let phonenumber = document.getElementById('phone').value
                let passwordConf = document.getElementById('passwordConf').value
                let data = {fullname: fullname,emailID: emailID, password: password, phone: phonenumber}
                if (password === passwordConf) {
                  if (emailID && password && passwordConf) {
                    const response = await axios.post(
                      `${process.env.REACT_APP_SERVER_HOSTNAME}/users/register`, 
                      data
                    )
                    console.log(`Server response: ${JSON.stringify(response.data, null, 0)}`)
                    setResponse(response.data)
                  }
                  else {
                    alert('All fields must be filled')
                  }
                }
                else {
                  alert('Passwords do not match')
                  document.getElementById('password').value = ''
                  document.getElementById('passwordConf').value = ''
                }

              }}
            >
              Register  
            </Button>
            <Button color="success" href="/SignIn"> Sign In </Button>
          </Stack>

        </Box>

      </Box>
  );
}
  
  export default SignUp;
  
  
  