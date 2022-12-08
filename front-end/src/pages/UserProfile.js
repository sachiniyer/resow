import './UserProfile.css';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import axios from "axios";
import MailIcon from '@mui/icons-material/Mail';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import PhoneIcon from '@mui/icons-material/Phone';
import Divider from '@mui/material/Divider';

function UserProfile(props) {

  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate()


  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('token')
      await axios(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/profile`, {
        headers: {
          Authorization: token
        }
      })
        .then(res => {
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', marginTop: "30px" }}>

        {/* <div className="TopPart"> */}
        <Stack direction="row" style={{ justifyContent: "center", display: "absolute" }} >
          <Avatar
            src={userDetails.img}
            alt="Profile Picture"
            sx={{ border: "solid 0.5px", borderColor: "black", width: 120, height: 120 }}
          />
        </Stack>
        <Box sx={{ fontSize: "40px", marginBottom: "20px" }}>{userDetails.fullname}</Box>
        {/* <h3 className="FullName"> {userDetails.fullname} </h3> */}
        {/* </div> */}
        {/*
        <Box sx={{ width: '100%', height: "100%"}} className = "UserDetails">
          <Stack direction= "column" alignItems="center">
            <TextContainer icon = <EmailIcon fontSize="large"/> text = {userDetails.emailID} />
            <TextContainer icon = <LocalPhoneIcon fontSize="large"/> text = {userDetails.phone} />
          </Stack>
        </Box> */}
        <Box sx={{ width: '100%', height: "100%" }}>
          <List sx={{ width: 1.0, border: 'solid 0.5px', borderColor: "black", bgcolor: 'white', borderRadius: 2 }}>

            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <MailIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={userDetails.emailID} sx={{ color: "black" }} />
            </ListItem>

            <Divider variant="inset" component="li" />

            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PhoneIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={userDetails.phone} sx={{ color: "black" }} />
            </ListItem>

          </List>
        </Box>

        <Box sx={{ m: 5 }}>
          <Stack spacing={2} direction="column" alignItems="center" >
            {/* <ButtonGroup variant="contained" color="success">
              <Button color="success" href="/PastUpload" variant="contained">Past Uploads</Button>
              <Button color="success" href="/UserProfile/SavedPost" variant="contained">Saved Posts</Button>
            </ButtonGroup> */}

            <Stack spacing={2} direction="row" alignItems="center" justifyContent="center">
              <Button color="success" href="/PastUpload" variant="contained">Past Uploads</Button>
              <Button color="success" href="/UserProfile/SavedPost" variant="contained">Saved Posts</Button>
            </Stack>


            {/* <Box sx={{display:"flex"}}> */}
            {/* <ButtonGroup variant="contained" color="success"> */}
            <Button color="success" href="/UserProfile/EditProfile" variant="outlined">Edit Profile</Button>
            <Box sx={{ height: "20px" }}></Box>
            <Button color="success" href="/" variant="text" onClick={() =>
              localStorage.removeItem('token')} > Sign Out </Button>
            {/* </ButtonGroup> */}
            {/* </Box> */}
          </Stack>

        </Box>

      </Box>
    </>
  );
}

export default UserProfile;


