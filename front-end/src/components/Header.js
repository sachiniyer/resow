import './Header.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import ListIcon from '@mui/icons-material/List';


function Header() {

  return (
    <>
      <Box className="theBox" sx={{ minHeight: '53px', zIndex:999999, position: "fixed", width: '100vw', alignItems: "center", justifyContent: "center", display: "flex", backgroundColor: "green" }}>
        <a href="/">
          <Box 
            component="img" 
            sx={{ height: 0.4, width: 0.67, fontSize: 30, color: "white", fontWeight: 100, fontFamily: 'monospace', objectFit: "cover", alignItems: "left" }}
            src="/re-sow logo final.png"
            alt="Re-sow">
          </Box>
        </a>
        <Box sx={{ width: { xs: 0.85, sm: 0.45, md: 0.3 }, margin: 1, display: "flex", justifyContent: "space-between" }}>
        {/* <Box sx={{ width: 0.7, margin: 1, display: "flex", justifyContent: "space-between" }}> */}
          
          <Box sx={{margin: '1vh'}}>
            <a href="/">
              <Avatar sx={{ backgroundColor: "white", width: '10vw', height: '10vw' }}>
                <LocationOnIcon color="success" fontSize="medium" sx={{ width: '7vw', height: '7vw' }}/>
              </Avatar>
            </a>
          </Box>
          <Box sx={{margin: '1vh'}}>
            <a href="/Map/ItemsList">
              <Avatar sx={{ backgroundColor: "white", width: '10vw', height: '10vw' }}>
                <ListIcon color="success" fontSize="medium" sx={{ width: '7vw', height: '7vw' }}/>
              </Avatar>
            </a>
          </Box>
          <Box sx={{margin: '1vh'}}>
            <a href="/UploadItem">
              <Avatar sx={{ backgroundColor: "white", width: '10vw', height: '10vw' }}>
                <AddIcon color="success" fontSize="medium" sx={{ width: '7vw', height: '7vw' }}/>
              </Avatar>
            </a>
          </Box>
          <Box sx={{margin: '1vh'}}>
            <a href="/UserProfile">
              <Avatar sx={{ backgroundColor: "white", width: '10vw', height: '10vw' }}>
                <PersonIcon color="success" fontSize="medium" sx={{ width: '7vw', height: '7vw' }}/>
              </Avatar>
            </a>
          </Box>
        </Box>
      </Box>
      <Box sx={{height: 53}}>
      </Box>
    </>
  );
}

export default Header;
