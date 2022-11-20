import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import axios from "axios";

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';

import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';

import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';


function EditProfile(props) {

  const [userDetails, setUserDetails] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('token')
      await axios(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/profile`, {headers: {
        Authorization: token
      }})
      .then(res => {
        console.log(res)
        setUserDetails(res.data)
      }).catch(err => {
        console.log(err)
        navigate("/SignIn")
      })
    }

    fetchData();

  }, [navigate]);


  return (

    <Box sx={{ height: "calc(100vh - 53px)" }}>

      <Box sx={{ mt: 3, mb: 2 }}>
        <Stack direction="row" style={{ justifyContent: "center", display: "absolute" }} >
          <Avatar
            src={userDetails.avatar}
            alt="Profile Picture"
            sx={{ border: "solid 0.5px", borderColor:"black", width: 120, height: 120 }}
          />
          <Fab component="label" sx={{ display: "absolute", mt: "80px", ml: "-40px", zIndex: 'tooltip' }} size="small" color="success" >
            <input hidden accept="image/*" type="file" />
            <EditIcon />
          </Fab >
        </Stack>
      </Box>

      <Stack spacing={1} direction="column" alignItems="center">
        <TextField label="Fullname"
          InputProps={{ startAdornment: (<InputAdornment position="start"> <AccountCircle/> </InputAdornment>), }} 
          variant="standard" 
          defaultValue={userDetails.fullname} 
          color="success" />

        <TextField label="Email ID"
          InputProps={{ startAdornment: (<InputAdornment position="start"> <EmailIcon /> </InputAdornment>), }} 
          variant="standard" 
          defaultValue={userDetails.emailId}
          color="success" />
          <p>{userDetails.emailId}</p>
        
        <TextField label="Phone Number"
          InputProps={{ startAdornment: (<InputAdornment position="start"> <LocalPhoneIcon /> </InputAdornment>), }} 
          variant="standard" 
          defaultValue={userDetails.phone}
          color="success" />
      </Stack>

      <Box sx={{ m: 2 }}>
        <Stack spacing={2} direction="row" alignItems="center" justifyContent="center">
          <Button color="success" href="/UserProfile" variant="contained">Save Changes</Button>
          <Button color="success" href="/UserProfile" variant="contained">Revert Changes</Button>
        </Stack>
      </Box>

    </Box>

  );
}

export default EditProfile;


