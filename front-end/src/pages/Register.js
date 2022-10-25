import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Stack from '@mui/material/Stack';


function SignUp(props) {
  const theme = {
    spacing: 8,
  }

  const [showPassword, setShowPassword] = useState(false);

  return (
      <Box sx={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: 'calc(100vh - 53px)' }}>
        <Box justifyContent="center" alignItems="center" sx={{mx: 'auto'}}>
          <Box sx={{ marginTop: '20vh' }}></Box>
          <TextField fullWidth label="Username" id="username" sx={{ m: 1 }} />
          <TextField fullWidth type={showPassword ? "text" : "password"} label="Password" id="password" sx={{ m: 1 }} />
          <TextField fullWidth type={showPassword ? "text" : "password"} label="Confirm Password" id="passwordConf" sx={{ m: 1 }} />
          <Stack spacing={2} direction= "column" alignItems="center" >
            <VisibilityIcon onClick={() => setShowPassword(s => !s)} sx={{cursor: 'pointer'}}/>
            <Button color="success" sx={{ m: 2 }} 
              onClick={ async () => {
                let username = document.getElementById('username').value
                let password = document.getElementById('password').value
                let passwordConf = document.getElementById('passwordConf').value
                const url = 'https://63532326d0bca53a8ebaecb3.mockapi.io/users'
                let data = {username: username, password: password}
                if (password == passwordConf) {
                  if (username && password && passwordConf) {
                    const response = await fetch(url, {
                      method: 'POST', // *GET, POST, PUT, DELETE, etc.
                      //mode: 'cors', // no-cors, *cors, same-origin
                      //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                      //credentials: 'same-origin', // include, *same-origin, omit
                      headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
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
            <Button color="success" href="/SignIn">Sign In</Button>
          </Stack>
          
        </Box>
      </Box>
  );
}
  
  export default SignUp;
  
  
  