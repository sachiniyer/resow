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
            <h2 className="FullName"> {props.fullname} </h2>
            <p className="Username"> @{props.username} </p>
          </div>

          <Box sx={{ width: '100%', height: "100%"}} className = "UserDetails">
            <Stack direction= "column" alignItems="center">
            <TextField label="First Name" variant="filled" color="success" focused />
            <TextField label="Last Name" variant="filled" color="success" focused />
            <TextField label="Email ID" variant="filled" color="success" focused />
            <TextField label="Filled success" variant="filled" color="success" focused />
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




  
  
  