import PostCard from '../components/Post';
import { useEffect,useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import axios from "axios";
import SearchBar from '../components/SearchBar';


function ItemList(props) {

  const [itemList,setItemList] = useState([]);

  async function fetchData() {
    const result = await axios(
      `${process.env.REACT_APP_SERVER_HOSTNAME}/posts`
    );
    setItemList(result.data);
  }
  

  useEffect(() => {
    fetchData();
  }, []);

    return (
      <>
      <Box sx={{height:10}}></Box>
      <SearchBar/>
        {itemList && itemList.map((item) => (
          <PostCard key={item._id} info = {item}/>
        ))}
        <Box sx={{position: "fixed", bottom: 20}}>
            <Button component={Link} to="/" variant="contained" color="success">Map</Button>
        </Box>
      </>
    );
  }
  
  export default ItemList;
  
  
  