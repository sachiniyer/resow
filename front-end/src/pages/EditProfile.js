import "./EditProfile.css"
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';


function TextFieldContainer(props){
  return(
    <Box sx={{ border: 1, borderRadius: '15px', m: 1, p: 1, color:'grey.800', bgcolor:'#e5e4e2'}}> 
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
          <div className="TopPart">
            <img className="ProfilePicture" src = "https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
            alt = "userimage"/>
          </div>

    
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




  /*

  <Box sx={{borderRadius: '15px', backgroundColor: '#e5e4e2', p:2, m: 'auto'}} className = "UserDetails" >
            <Stack spacing={1} direction= "column" alignItems="center">
            <TextField label="Full Name" defaultValue = {props.fullname} variant="filled" color="success" focused />
            <TextField label="Username" defaultValue = {props.username} variant="filled" color="success" focused />
            <TextField label="Email ID" defaultValue = {props.email} variant="filled" color="success" focused />
            <TextField label="Phone Number" defaultValue = {props.tel} variant="filled" color="success" focused />
            <TextField label="Location" defaultValue = {props.location} variant="filled" color="success" focused />
            </Stack>
          </Box>

  */
  
  