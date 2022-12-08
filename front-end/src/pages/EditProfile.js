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
  const [fullname, setFullname] = useState("");
  const [emailID, setEmailID] = useState("");
  const [phone, setPhone] = useState("");
  const [img, setImg] = useState([""]);
  const [avatarImg, setAvatarImg] = useState();
  const [uploadImg, setUploadImg] = useState();

  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('token')
      await axios(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/profile`, {headers: {
        Authorization: token
      }})
      .then(res => {
        setUserDetails(res.data)
        setFullname(res.data.fullname)
        setEmailID(res.data.emailID);
        setPhone(res.data.phone);
        setImg(res.data.imgPath);
      }).catch(err => {
        console.log(err)
        navigate("/SignIn")
      })
    }

    fetchData();
    imgRoute()

  }, [navigate]);

  const revertInfo = () => {
    setEmailID(userDetails.emailID);
    setFullname(userDetails.fullname);
    setPhone(userDetails.phone);
    setImg(userDetails.imgPath);
    setAvatarImg(img);
    setUploadImg(img);
  };

  async function editProfile(){
    const data = new FormData();
    
    const d = new Date()
    data.append('file', uploadImg, d.getTime())
    data.append('fullname', fullname)
    data.append('emailID', emailID)
    data.append('phone', phone)

    axios.patch(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/${userDetails.id}`,data)
    .then(res => {
      if (res.data.message==="ok"){
        alert("The profile has been updated")
        window.location.replace("/UserProfile")
      }
      if (res.data.message==="emailID"){
        alert("Invalid email format!")
        .then(revertInfo())
      }
      if (res.data.message==="phone"){
        alert("Invalid phone number format!")
        .then(revertInfo())
      }
    })
    .catch(err => {
      revertInfo();
    })

  }

  const imgRoute = () => {
    if(img){setAvatarImg(img)}
    else{return}
  }

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

    <Box sx={{ height: "calc(100vh - 53px)" }}>

      <Box sx={{ mt: 3, mb: 2 }}>
        <Stack direction="row" style={{ justifyContent: "center", display: "absolute" }} >
          <Avatar
            src = {avatarImg}
            sx={{ border: "solid 0.5px", borderColor:"black", width: 120, height: 120 }}
          />
          <Fab component="label" sx={{ display: "absolute", mt: "80px", ml: "-40px", zIndex: 'tooltip' }} size="small" color="success" >
            <form role="form">
                <input
                  hidden
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="image"
                  type="file"
                  onChange={handleUpload}
                />
                <label htmlFor="image">
                  <EditIcon />
                </label>    
              </form>
          </Fab >
        </Stack>
      </Box>

      <Stack spacing={1} direction="column" alignItems="center">
        <TextField label="Fullname"
          InputProps={{ startAdornment: (<InputAdornment position="start"> <AccountCircle/> </InputAdornment>), }} 
          variant="standard" 
          value={fullname} 
          onChange={event => setFullname(event.target.value)}
          color="success" />

        <TextField label="Email ID"
          InputProps={{ startAdornment: (<InputAdornment position="start"> <EmailIcon /> </InputAdornment>), }} 
          variant="standard" 
          value = {emailID}
          onChange={event => setEmailID(event.target.value)}
          color="success" />
          <p>{userDetails.emailId}</p>
        
        <TextField label="Phone Number"
          InputProps={{ startAdornment: (<InputAdornment position="start"> <LocalPhoneIcon /> </InputAdornment>), }} 
          variant="standard" 
          value={phone}
          onChange={event => setPhone(event.target.value)}
          color="success" />
      </Stack>

      <Box sx={{ m: 2 }}>
        <Stack spacing={2} direction="row" alignItems="center" justifyContent="center">
          <Button onClick={editProfile} color="success" variant="contained">Save Changes</Button>
          <Button onClick={revertInfo} color="success" variant="contained">Revert Changes</Button>
        </Stack>
      </Box>

    </Box>

  );
}

export default EditProfile;


