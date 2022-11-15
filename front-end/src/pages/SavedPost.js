import { Link } from "react-router-dom";

import SearchBar from '../components/SearchBar';
import PostCard from '../components/Post';
import axios from "axios";
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function SavedPost(props) {

  // const userId = "6369ac0214b5d4cb75cec8e4"
  const userId = "6369ac2814b5d4cb75cec8e7"

  const [data, setData] = useState([]);

  const [noSavedPost, setNoSavedPost] = useState(true);

  useEffect(() => {

    async function fetchData() {

      const result = await axios(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/posts/saved-posts/`+userId
      );

      setData(result.data);
      setNoSavedPost(result.data.length===0)
    }

    fetchData();
  }, []);

  return (
    <>
        <Box sx = {{color:"black", fontSize:"40px",margin:"10px"}}>Saved Post</Box>
        <SearchBar/> 
          {data && data.map((item) => (
            <PostCard
              key={item._id}
              info={item}
            />
          ))}
        {noSavedPost
          ? <Box sx={{border:"solid",marginTop:"100px"}}>
              <Box component="img" sx={{width:{xs:0.9,sm:0.8,md: 0.7},objectFit:"cover"}} alt="thumbnail" src={"/resowLogo.png"}></Box>
              <Box sx = {{color:"black", fontSize:"30px",width:1}}>There is no saved posts yet</Box>
            </Box>
          : null
        }
      <Box sx={{ position: "fixed", bottom: 20 }}>
        <Button component={Link} to="/UserProfile" variant="contained" color="success">Back to Profile</Button>
      </Box>
    </>
  )
}

export default SavedPost