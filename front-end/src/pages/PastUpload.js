import { Link } from "react-router-dom";

import SearchBar from '../components/SearchBar';
import PostCard from '../components/Post';
import axios from "axios";
import { useEffect,useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function PastUpload(props) {

  const [data, setData] = useState([]);

  useEffect(() => {

    async function fetchData() {

      const result = await axios(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/posts`
      );

      setData(result.data);
    }

    fetchData();
  }, []);

    return (
      <>
        <Box sx = {{color:"black", fontSize:"40px",margin:"10px"}}>Saved Post</Box>
        <SearchBar></SearchBar>
        { data && data.map((item) => (
          <PostCard 
            key={item._id}  
            info={item}
          />
        ))}

      <Box sx={{position: "fixed", bottom: 20}}>
            <Button component={Link} to="/UserProfile" variant="contained" color="success">Back to Profile</Button>
      </Box>
    </>
    );
  }

  export default PastUpload