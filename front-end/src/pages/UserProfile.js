import './UserProfile.css';
import * as React from 'react';
import { useEffect,useState } from 'react';
import { useNavigate } from "react-router-dom"
import axios from "axios";

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

function TextContainer(props){
  return(
    <Box sx={{ border: 1, borderRadius: '15px', m: 1, p: 1, minWidth: '30%', minHeight:'10%', color:'grey.800'}}> 
      <Stack spacing = {5} direction = "row" alignItems="center" justifyContent="center">
        {props.icon} {props.text} 
      </Stack>
    </Box>
  );
}


function UserProfile(props) {

  const [userDetails,setUserDetails] = useState({});
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
    <>
      <Box sx={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: 'calc(100vh - 53px)' }}> 

        <div className="TopPart">
          <Stack direction="row" style={{ justifyContent: "center", display: "absolute" }} >
            <Avatar
              src={userDetails.avatar}
              alt="Profile Picture"
              sx={{ border: "solid 0.5px", borderColor:"black", width: 120, height: 120 }}
            />
          </Stack>
           <h3 className="FullName"> {userDetails.fullname} </h3>
        </div>

        <Box sx={{ width: '100%', height: "100%"}} className = "UserDetails">
          <Stack direction= "column" alignItems="center">
            <TextContainer icon = <EmailIcon fontSize="large"/> text = {userDetails.emailID} />
            <TextContainer icon = <LocalPhoneIcon fontSize="large"/> text = {userDetails.phone} />
          </Stack>
        </Box>

        <Box sx={{m: 5}}>
          <Stack spacing={2} direction= "column" alignItems="center" >
            <Button color="success" href="/PastUpload" variant="contained">Past Uploads</Button>
            <Button color="success" href="/UserProfile/SavedPost" variant="contained">Saved Posts</Button>
            <Button color="success" href="/UserProfile/EditProfile" variant="contained">Edit Profile</Button>
            <Button color="success" href="/" variant="contained" onClick={() => 
            localStorage.removeItem('token')} > Sign Out </Button>
          </Stack>
        </Box>
  
      </Box>
    </>
  );
}

export default UserProfile;


