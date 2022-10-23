import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

function SignIn(props) {
  
  return (
    <div className="SignIn">
      <Box margin="auto">
        <Avatar sx={{width: 100, height: 100, marginLeft:2.5, marginTop:2}} alt="thumbnail" src={props.profileURL}/>
        <TextField fullWidth label="Username" id="username" />
        <TextField fullWidth label="Password" id="password" />
        <Button
          onClick={ async () => {
            let username = document.getElementById('username').value
            const response = await fetch('https://63532326d0bca53a8ebaecb3.mockapi.io/users')
            .then((response) => response.json())
            .then(function (users) {
              let validUser = false
              console.log(typeof(users));
              console.log(users);
              
              for (let user in users) {
                console.log("user.name=",users[user].name)
                console.log(user[user])
                if (users[user].name == username) {validUser = true}
              }
              console.log(validUser)
              if (validUser) {alert('logged in');}})
            
          }}
        >
          Login
        </Button>
      </Box>
    </div>
  );
}
  
  export default SignIn;
  
  
  