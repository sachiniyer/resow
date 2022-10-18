import './UserProfile.css';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';




function UserProfile(props) {
  return (
    <>
      <div className="UserProfile">

        <div className="TopPart">
          <img className="ProfilePicture" src = "https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
           alt = "userimage"/>
           <h2 className="FullName"> {props.fullname} </h2>
           <p className="Username"> @{props.username} </p>
        </div>

        <Box sx={{ width: '100%' }} className = "UserDetails">
          <Stack direction= "column" alignItems="center">
            <p> {props.email} </p>
            <p> {props.tel} </p>
            <p> {props.location} </p>
          </Stack>
        </Box>

        <Box>
          <Stack spacing={2} direction= "column" alignItems="center" >
            <Stack spacing={2} direction = "row" alignItems="center" justifyContent="center">
              <Button color="success" href="/PastUpload" variant="contained">Past Uploads</Button>
              <Button color="success" href="/UserProfile/SavedPost" variant="contained">Saved Posts</Button>
            </Stack>
            <Button color="success" href="/UserProfile/EditProfile" variant="contained">Edit Profile</Button>
            <Button color="success" href="/" variant="contained">Sign Out</Button>
          </Stack>
        </Box>
  
      </div>
      </>
      );
}

export default UserProfile;


