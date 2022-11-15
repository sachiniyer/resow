import * as React from 'react';

import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Stack from '@mui/material/Stack';


function SignUp(props) {

  const [showPassword, setShowPassword] = useState(false);

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
                const url = `${process.env.REACT_APP_SERVER_HOSTNAME}/users` //'http://localhost:5002/users'
                let data = {fullname: fullname,emailID: emailID, password: password, phone: phonenumber}
                if (password === passwordConf) {
                  if (emailID && password && passwordConf) {
                    //use axios to send data to the backend
                    const response = await fetch(url, {
                      method: 'POST', // *GET, POST, PUT, DELETE, etc.
                      mode: 'cors', // no-cors, *cors, same-origin
                      //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                      //credentials: 'same-origin', // include, *same-origin, omit
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      redirect: 'follow', // manual, *follow, error
                      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                      body: JSON.stringify(data) // body data type must match "Content-Type" header
                    })
                    .then((response) => response.json())
                    .then((data) => console.log('response:',data))
                    .then(alert('Registered!'));
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
  
  
  