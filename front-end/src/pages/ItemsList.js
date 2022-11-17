import PostCard from '../components/Post';
import { useEffect,useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import axios from "axios";
import { getLocation } from '../components/Location'
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';


function ItemList(props) {
  

  let longitude = getLocation()[0];
  let latitude = getLocation()[1];

  const [itemList,setItemList] = useState([]);
  const [searchList,setSearchList] = useState([]);
  const [val,setVal] = useState("");

  async function fetchData() {
    const result = await axios(
      `${process.env.REACT_APP_SERVER_HOSTNAME}/posts/longitude=`+longitude+"&latitude="+latitude
    );
    setItemList(result.data);
    setSearchList(result.data);
  }
  

  useEffect(() => {
    fetchData();   
  }, []);

  useEffect(() =>{
    if(val!==""){
      const timeOutId = setTimeout(() =>{
        let temp = [];
        let query = val.toLowerCase()
        for (let i=0; i<itemList.length; i++){
          let str = itemList[i].title.toLowerCase();
          if(str.search(query) !== -1){
            temp.push(itemList[i])
          }
        }
        setSearchList(temp)

      },1000);
    }
    else{
      if(itemList.length!==0){
        const timeOut = setTimeout(()=>{
          setSearchList(itemList)
        },1001)
      }
    }
  },[val])

    return (
      <>
      <Box sx={{height:10}}></Box>
        <Container maxWidth="sm">
        <TextField fullWidth id="standard-basic" label="Search" variant="filled" 
        onChange={(newValue) => setVal(newValue.target.value)} 
        />
      </Container>
        {searchList && searchList.map((item) => (
          <PostCard key={item._id} info = {item}/>
        ))}
        <Box sx={{position: "fixed", bottom: 20}}>
            <Button component={Link} to="/" variant="contained" color="success">Map</Button>
        </Box>
      </>
    );
  }
  
  export default ItemList;
  
  
  