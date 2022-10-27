import './UserProfile.css';
import * as React from 'react';
import { useEffect,useState } from 'react';
import axios from "axios";

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

import EmailIcon from '@mui/icons-material/Email';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

function TextContainer(props){
  return(
    <Box sx={{ border: 1, borderRadius: '15px', m: 1, p: 1, minWidth: '30%', minHeight:'10%', color:'grey.800', bgcolor:'#e5e4e2'}}> 
      <Stack spacing = {5} direction = "row" alignItems="center" justifyContent="center">
        {props.icon} {props.text} 
      </Stack>
    </Box>
  );
}


function UserProfile(props) {

  const [userDetails,setUserDetails] = useState([]);

  useEffect(() => {
    async function fetchData(){
      const response = await axios (
        "https://my.api.mockaroo.com/users.json?key=13a3e900"
      );

      setUserDetails(response.data);

    }

    fetchData();

  }, []);

  return (
    <>

      <Box sx={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: 'calc(100vh - 53px)' }}> 

        <div className="TopPart">
          <Stack direction="row" style={{ justifyContent: "center", display: "absolute" }} >
            <Avatar
              src={userDetails.avatar}
              alt="Profile Picture"
              sx={{ border: 1, width: 120, height: 120 }}
            />
          </Stack>
           <h2 className="FullName"> {userDetails.full_name} </h2>
           <p className="Username"> @{userDetails.username} </p>
        </div>

        <Box sx={{ width: '100%', height: "100%"}} className = "UserDetails">
          <Stack direction= "column" alignItems="center">

            <TextContainer icon = <EmailIcon fontSize="large"/> text = {userDetails.email} />
            <TextContainer icon = <LocalPhoneIcon fontSize="large"/> text = {userDetails.phone} />
            <TextContainer icon = <HomeRoundedIcon fontSize="large"/>text = {userDetails.location} />
          </Stack>
        </Box>

        <Box sx={{m: 2}}>
          <Stack spacing={2} direction= "column" alignItems="center" >
            <Stack spacing={2} direction = "row" alignItems="center" justifyContent="center">
              <Button color="success" href="/PastUpload" variant="contained">Past Uploads</Button>
              <Button color="success" href="/UserProfile/SavedPost" variant="contained">Saved Posts</Button>
            </Stack>
            <Button color="success" href="/UserProfile/EditProfile" variant="contained">Edit Profile</Button>
            <Button color="success" href="/" variant="contained">Sign Out</Button>
            <Button color="success" href="/SignIn" variant="contained">Sign In</Button>
          </Stack>
        </Box>
  
      </Box>
    </>
  );
}

export default UserProfile;


