import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

function SignIn() {
    return (
      <div className="SignIn">
        <Box>
          <Avatar sx={{width: 100, height: 100, marginLeft:2.5, marginTop:2}} alt="thumbnail" src={props.profileURL}/>
          <TextField fullWidth label="Username" id="fullWidth" />
          <TextField fullWidth label="Password" id="fullWidth" />
        </Box>
      </div>
    );
  }
  
  export default SignIn;
  
  
  