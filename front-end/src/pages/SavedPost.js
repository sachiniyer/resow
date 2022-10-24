import { Link } from "react-router-dom";

import SearchBar from '../components/SearchBar';
import PostCard from '../components/Post';
import axios from "axios";
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function SavedPost(props) {

  const [data, setData] = useState([]);

  useEffect(() => {

    async function fetchData() {

      const result = await axios(
        "https://my.api.mockaroo.com/items/?key=59c3eda0"
      );

      setData(result.data);
    }

    fetchData();
  }, []);

  return (
    <>
        <SearchBar/> 
          {data && data.map((item) => (
            <PostCard
              key={item.id}
              info={item}
            />
          ))}
      <Box sx={{ position: "fixed", bottom: 20 }}>
        <Button component={Link} to="/UserProfile" variant="contained" color="success">Back to Profile</Button>
      </Box>
    </>
  );
}

export default SavedPost
