import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Stack from '@mui/material/Stack';
import axios from "axios"

function SignIn(props) {
  const [showPassword, setShowPassword] = useState(false);

  const [emailID, setEmailID] = useState('')
  const [password, setPassword] = useState('')


  const handleSubmit = async e => {
    // prevent the HTML form from actually submitting
    e.preventDefault()

    try {

      //console.log(emailID, password) //for debugging
      let data = {emailID: emailID, password: password}
      
      // send a POST request with the data to the server api to authenticate
      const response = await axios.post(
        `http://localhost:5002/users/login`, data
      )

      // store the response data into the data state variable
      console.log(`Server response: ${JSON.stringify(response.data, null, 0)}`)
    } catch (err) {
      // request failed... user entered invalid credentials
      console.log(err)
    
    }
  }

  //const [validUser, setvalidUser] = useState(false);
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: 'calc(100vh - 53px)' }} className="SignIn" justifyContent="center">
      <Box justifyContent="center" alignItems="center" sx={{ mx: 'auto' }}>

        <Box sx={{ marginTop: '20vh' }}></Box>
        
        <Avatar sx={{border: "solid", borderColor:"black", width: 150, height: 150, m: 1, margin: '0 auto' }} alt="profile pic" src={props.logo} />

        <h3> Welcome to Resow </h3>

        <form>
          <Box justifyContent="center" alignItems="center" sx={{ m: 2 }}>
            <TextField fullWidth label="Email" id="emailID" sx={{ m: 1 }} onChange={event => setEmailID(event.target.value)} />
            <TextField type={showPassword ? "text" : "password"} fullWidth label="Password" id="password" sx={{ m: 1 }}  onChange={event => setPassword(event.target.value)}/>
            <VisibilityIcon onClick={() => setShowPassword(s => !s)} sx={{ cursor: 'pointer' }} />  
          </Box>

          <Stack spacing={2} direction="column" alignItems="center" >
            <Button color="success" variant="contained" sx={{ width: 100 }}
              onClick={handleSubmit}
            > Sign In </Button>
            <Button color="success" variant="contained"  href="/Register" sx={{ width: 100 }}> Register </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}

export default SignIn;
