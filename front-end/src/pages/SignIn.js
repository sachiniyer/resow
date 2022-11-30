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

function SignIn(props) {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);

  const [emailID, setEmailID] = useState('')
  const [password, setPassword] = useState('')

  const [responseServer, setResponse] = useState({}) // the API will return an object with a JWT token, if the user logs in successfully


  useEffect(() => {
    // if the user is logged-in, save the token to local storage
    if (responseServer.success && responseServer.token) {
      console.log("User successfully logged in")
      //console.log(responseServer.token) //for debugging
      localStorage.setItem('token', responseServer.token) // store the token into localStorage
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
        //console.log(res)  //for debugging
        navigate("/UserProfile")
      }).catch(err => {
        console.log(err)
        navigate("/SignIn")
        
      })
    }

    checkLoggedIn();

  }, [navigate]);



  const handleSubmit = async e => {
    // prevent the HTML form from actually submitting
    e.preventDefault()

    try {
      //console.log(emailID, password) //for debugging
      
      // send a POST request with the data to the server api to authenticate
      await axios.post(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/users/login`, 
        {emailID: emailID, password: password}
      )
      .then(res => {
        if (res.data.message==="ok"){
          alert("User successfully logged in")
          // store the response data into the data state variable
          setResponse(res.data)
        }
        if (res.data.message==="emailID"){
          alert("invalid email format!")
          window.location.reload()
        }
        if (res.data.message==="phone"){
          alert("invalid phone number format!")
          window.location.reload()
        }

        //console.log(`Server response: ${JSON.stringify(res.data, null, 0)}`)

      })
      .catch(err => {
        window.location.reload()
      })
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
        
        <Avatar sx={{ width: 150, height: 150, m: 1, margin: '0 auto' }} alt="profile pic" src={props.logo} />

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
