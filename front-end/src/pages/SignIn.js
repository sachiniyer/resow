import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';

function SignIn(props) {
  const theme = {
    spacing: 8,
  }

  const [showPassword, setShowPassword] = useState(false);
  const [validUser, setvalidUser] = useState(false);

  return (
    <div className="SignIn" justifyContent="center">
      <Box justifyContent="center" alignItems="center" sx={{mx: 'auto'}}>
        <Avatar sx={{width: 100, height: 100, m: 1, margin: '0 auto'}} alt="profile pic" src={props.profileURL}/>
        <TextField fullWidth label="Username" id="username" sx={{ m: 1 }} />
        <TextField type={showPassword ? "text" : "password"} fullWidth label="Password" id="password" sx={{ m: 1 }} />
        <VisibilityIcon onClick={() => setShowPassword(s => !s)} sx={{cursor: 'pointer'}}/>
        <Button sx={{ m: 2 }}
          onClick={ async () => {
            let username = document.getElementById('username').value
            let password = document.getElementById('password').value
            if (username && password) {
              const response = await fetch('https://63532326d0bca53a8ebaecb3.mockapi.io/users')
              .then((response) => response.json())
              .then(function (users) {
                console.log(typeof(users));
                console.log(users);

                for (let user in users) {
                  console.log("user.name=",users[user].name)
                  console.log(user[user])
                  if (users[user].name == username) {setvalidUser(true)}
                }
                console.log(validUser)
                if (validUser) {alert('Logged in');}
                else {
                  alert('User not found')
                  document.getElementById('username').value = ''
                  document.getElementById('password').value = ''
                }
              })
            }
            else {
              alert('All fields must be filled')
            }
          }}
        >
          Login
        </Button>
        <Button href="/Register">Register</Button>
      </Box>
    </div>
  );
}
  
  export default SignIn;
  
  
  