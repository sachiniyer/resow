import logo from '../static/resowLogo.png';
import './Header.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

function Header() {
  return (
    <header className="App-header">
      <Container maxWidth="sm">
        <Box display="flex" justifyContent="space-between">
          <a href="#map"><img src={logo} href="#map" className="logo" alt="logo" /></a>
        </Box>
      </Container>
    </header>
  );
}

export default Header;
