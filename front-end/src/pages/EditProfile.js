import "./EditProfile.css"
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';

import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';

import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

function TextFieldContainer(props){
  return(
    <Box sx={{ borderRadius: '7px', m: 1, p: 0.95, color:'grey.800', bgcolor:'#e5e4e2'}}> 
      <TextField label={props.label}
        InputProps={{startAdornment: ( <InputAdornment position="start"> {props.icon} </InputAdornment>),}} 
        variant="standard" 
        defaultValue = {props.text}
        color="success"/>
    </Box>
  );
}

function EditProfile(props) {
    return (
      <>
        <div className="EditProfile">

          <Box className ="Container" sx={{mt: 3, mb: 2}}>

            <Stack direction="row" style={{ justifyContent: "center", display: "flex", p: 2}} spacing={1}>
              <Avatar
              alt="Profile Picture"
              src={props.source}
              sx={{ width: 120, height: 120 }}
              />
            </Stack>

            <Fab className = "EditButton" sx={{position: 'absolute', top: 80, left: '52%', zIndex: 'tooltip'}} size="small" color="success" aria-label="edit">
              <EditIcon />
            </Fab>

          </Box>

          <Stack spacing={1} direction= "column" alignItems="center">
            <TextFieldContainer label="Full Name" icon = <AccountCircle/> text = {props.fullname}/>
            <TextFieldContainer label="Username" icon = <AlternateEmailIcon/> text = {props.username}/>
            <TextFieldContainer label="Email ID" icon = <EmailIcon /> text = {props.email}/>
            <TextFieldContainer label = "Phone Number" icon = <LocalPhoneIcon/> text = {props.tel} /> 
            <TextFieldContainer label="Location" icon = <HomeRoundedIcon /> text = {props.location} />
          </Stack>

          <Box sx={{m: 2}}>
            <Stack spacing={2} direction = "row" alignItems="center" justifyContent="center">
              <Button color="success" href="/UserProfile" variant="contained">Save Changes</Button>
              <Button color="success" href="/UserProfile" variant="contained">Revert Changes</Button>
            </Stack>
          </Box>

        </div>
      </>
      
    );
  }
  
  export default EditProfile;
  
  