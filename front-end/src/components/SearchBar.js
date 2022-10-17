import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import * as React from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';

function SearchBar() {
  return (
    <Container maxWidth="sm">
      <TextField fullWidth id="standard-basic" label="Search" variant="filled" />
    </Container>
  );
}

export default SearchBar;
