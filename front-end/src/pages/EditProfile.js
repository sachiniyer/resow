import "./EditProfile.css"
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


function EditProfile(props) {
    return (
      <>
        <div className="EditProfile">
          <div className="TopPart">
            <img className="ProfilePicture" src = "https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
            alt = "userimage"/>
          </div>

          <Box sx={{ width: '25%', height: "100%", borderRadius: '15px', backgroundColor: '#e5e4e2', p:2}} className = "UserDetails">
            <Stack spacing={1} direction= "column" alignItems="center">
            <TextField label="Full Name" defaultValue = {props.fullname} variant="filled" color="success" focused />
            <TextField label="Username" defaultValue = {props.username} variant="filled" color="success" focused />
            <TextField label="Email ID" defaultValue = {props.email} variant="filled" color="success" focused />
            <TextField label="Phone Number" defaultValue = {props.tel} variant="filled" color="success" focused />
            <TextField label="Location" defaultValue = {props.location} variant="filled" color="success" focused />
            </Stack>
          </Box>

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




  
  
  