import './Footer.css';
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


function Footer() {

  return (
    <>
      <Box sx={{ zIndex: 1, position: "fixed", width: 1, alignItems: "center", justifyContent: "center", display: "flex", backgroundColor: "green" }}>
        <Box sx={{ width: { xs: 0.85, sm: 0.45, md: 0.3 }, margin: 1, display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ height: 40, width: 0.45, fontSize: 30, color: "white", fontWeight: 100, fontFamily: 'monospace' }}>
            <a href="/">Re-sow</a>
          </Box>

          <Box>
            <a href="/">
              <Avatar sx={{ backgroundColor: "white", width: 40, height: 40 }}>
                <LocationOnIcon color="success" fontSize="medium" />
              </Avatar>
            </a>
          </Box>
          <Box>
            <a href="/Map/ItemsList">
              <Avatar sx={{ backgroundColor: "white", width: 40, height: 40 }}>
                <ListIcon color="success" fontSize="medium" />
              </Avatar>
            </a>
          </Box>
          <Box>
            <a href="/UploadItem">
              <Avatar sx={{ backgroundColor: "white", width: 40, height: 40 }}>
                <AddIcon color="success" fontSize="medium" />
              </Avatar>
            </a>
          </Box>
          <Box>
            <a href="/UserProfile">
              <Avatar sx={{ backgroundColor: "white", width: 40, height: 40 }}>
                <PersonIcon color="success" fontSize="medium" />
              </Avatar>
            </a>
          </Box>
        </Box>
      </Box>
      <Box sx={{ border: "solid", height: 53, opacity: 0 }}>

      </Box>
    </>




  );
}

export default Footer;
