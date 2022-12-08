import * as React from 'react';
import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"


import Avatar from '@mui/material/Avatar';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
//import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Stack from '@mui/material/Stack';

//import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';


function SignUp(props) {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [responseServer, setResponse] = useState({}) // the API will return an object with a JWT token, if the user logs in successfully
  const [avatarImg, setAvatarImg] = useState();
  const [uploadImg, setUploadImg] = useState();
  //const [loaded, setLoaded] = useState(0);

  useEffect(() => {
    async function setToken() {

      if (responseServer.success) {

        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/users/login`,
          { emailID: responseServer.emailID, password: responseServer.password }
        )
        console.log(`User registered successfully: ${JSON.stringify(response.data, null, 0)}`)
        localStorage.setItem('token', response.data.token) // store the token into localStorage
        navigate('/UserProfile')

      }
    }

    setToken();

  }, [responseServer, navigate]);

  async function handleUpload(event) {
    let file = event.target.files[0]
    let reader = new FileReader();
    reader.onload = () => {
      setAvatarImg(reader.result)
    };
    if (file) {
      setUploadImg(event.target.files[0])
      reader.readAsDataURL(file);
    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: 'calc(100vh - 53px)' }}>

      <Box justifyContent="center" alignItems="center" sx={{ mx: 'auto' }}>

        <Box sx={{ marginTop: '20vh' }}></Box>
        <Stack spacing={1} direction="column" alignItems="center" sx={{ m: 1, minWidth: 290 }}>

          <Stack direction="row" style={{ justifyContent: "center", display: "absolute" }} >
            
            <Avatar sx={{ border: "solid", borderColor: "#1b5e20", width: 130, height: 130, m: 1, margin: '0 auto' }} alt="profile pic" src={avatarImg} />

            <Fab component="label" sx={{ display: "absolute", mt: "90px", ml: "-40px", zIndex: 'tooltip' }} size="small" color="success" >
              <form>
                  <input
                    hidden
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="image"
                    type="file"
                    onChange={handleUpload}
                  />
                  <label htmlFor="image">
                    <PhotoCamera sx={{display: "center"}} />
                  </label>
                </form>
            </Fab >
          </Stack>

          <TextField fullWidth label="Fullname" id="fullname" sx={{ m: 1 }} />
          <TextField fullWidth label="Email ID" id="email" sx={{ m: 1 }} />
          <TextField fullWidth label="Phone Number" id="phone" sx={{ m: 1 }} />
          <TextField fullWidth type={showPassword ? "text" : "password"} label="Password" id="password" sx={{ m: 1 }} />
          <TextField fullWidth type={showPassword ? "text" : "password"} label="Confirm Password" id="passwordConf" sx={{ m: 1 }} />
        </Stack>

        <Stack spacing={2} direction="column" alignItems="center" >
          <VisibilityIcon onClick={() => setShowPassword(s => !s)} sx={{ cursor: 'pointer' }} />
          <Button color="success" sx={{ m: 2 }}
            onClick={async () => {
              let fullname = document.getElementById('fullname').value
              let emailID = document.getElementById('email').value
              let password = document.getElementById('password').value
              let phone = document.getElementById('phone').value
              let passwordConf = document.getElementById('passwordConf').value
              const data = new FormData();
              
              const d = new Date()
              data.append('file', uploadImg, d.getTime())
              data.append('fullname', fullname)
              data.append('emailID', emailID)
              data.append('password', password)
              data.append('phone', phone)

              const url = `${process.env.REACT_APP_SERVER_HOSTNAME}/users/register`

              /*var config = {
                onUploadProgress: function (progressEvent) {
                  var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                  setLoaded(percentCompleted)
                }
              };*/

              if (password === passwordConf) {
                if (emailID && password && passwordConf) {
                  await axios.post(url, data)
                    .then(res => {
                      if (res.data.success === true) {
                        alert("User registered successfully")
                        setResponse(res.data)
                      }
                      if (res.data.message === "Email already in use") {
                        alert("An account already exists with this email")
                        window.location.reload()
                      }
                      if (res.data.message === "emailID") {
                        alert("Invalid email format!")
                        window.location.reload()
                      }
                      if (res.data.message === "phone") {
                        alert("invalid phone number format!")
                        window.location.reload()
                      }
                    })

                  //console.log(`Server response: ${JSON.stringify(response.data, null, 0)}`
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
