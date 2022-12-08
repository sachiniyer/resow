import * as React from 'react';
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Stack from '@mui/material/Stack';
import axios from "axios"

import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#6fbf73',
      main: '#4caf50',
      dark: '#357a38',
      contrastText: '#fff',
    },
    secondary: {
      light: '#91ff35',
      main: '#76ff03',
      dark: '#52b202',
      contrastText: '#000',
    },
  },
})

function SignIn(props) {

  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false);

  const [emailID, setEmailID] = useState('')

  const [password, setPassword] = useState('')

  const [responseServer, setResponse] = useState({}) 

  useEffect(() => {
    if (responseServer.success && responseServer.token) {
      console.log("User successfully logged in")
      localStorage.setItem('token', responseServer.token) 
      navigate('/UserProfile')
    }
  
  }, [responseServer, navigate])

  useEffect(() => {
    async function checkLoggedIn() {
      const token = localStorage.getItem('token')
      await axios(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/profile`, {headers: {
        Authorization: token
      }})
      .then(res => {
        navigate("/UserProfile")
      }).catch(err => {
        console.log(err)
        navigate("/SignIn")
        
      })
    }
    checkLoggedIn();
  }, [navigate]);

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/users/login`, 
        {emailID: emailID, password: password}
      )
      .then(res => {
        if (res.data.success===true){
          setResponse(res.data) 
        }
        if (res.data.message==="emailID"){
          alert("invalid email format!")
          window.location.reload()
        }
        if (res.data.message==="User not found"){
          alert("User not found")
          window.location.reload()
        }
        if (res.data.message==="Incorrect password"){
          alert("Incorrect password, try again")
          window.location.reload()
        }
        if (res.data.message==="phone"){
          alert("invalid phone number format!")
          window.location.reload()
        }
      })
      .catch(err => {
        window.location.reload()
      })
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: 'calc(100vh - 53px)' }} className="SignIn" justifyContent="center">
      <Box justifyContent="center" alignItems="center" sx={{ mx: 'auto'}}>

        <Box sx={{ marginTop: '20vh' }}></Box>
        
        <Avatar sx={{ width: 150, height: 150, m: 1, margin: '0 auto', border: "solid 1px", borderColor: "#4caf50" }} alt="profile pic" src={props.logo} />

        <h3> Welcome to Resow </h3>

        <form>
          <Box justifyContent="center" alignItems="center" sx={{ m: 2 }}>
            <ThemeProvider theme={theme}>
              <TextField fullWidth label="Email" id="emailID" sx={{ m: 1 }} onChange={event => setEmailID(event.target.value)} />
              <TextField type={showPassword ? "text" : "password"} fullWidth label="Password" id="password" sx={{ m: 1 }}  onChange={event => setPassword(event.target.value)}/>
              <VisibilityIcon onClick={() => setShowPassword(s => !s)} sx={{ cursor: 'pointer', color: 'success.main' }} />
            </ThemeProvider>  
          </Box>
          <Stack spacing={2} direction="column" alignItems="center" sx={{marginBottom: '2vh'}}>
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
