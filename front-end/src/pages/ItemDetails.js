import * as React from 'react';
import { useEffect,useState } from 'react';
import ImgCarousel from '../components/carousel/ImgCarousel';
import ContactBox from '../components/ContactBox';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import AspectRatio from '@mui/joy/AspectRatio';
import axios from "axios";
import ClickAwayListener from '@mui/material/ClickAwayListener';

export default function ItemDetails({match}){

    const [itemDetails,setItemDetails] = useState({})

    const id = match

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
      setOpen((prev) => !prev);
    };

    const handleClickAway = () => {
      setOpen(false);
    };

    async function fetchData() {
      const result = await axios(
        "https://my.api.mockaroo.com/items/"+id+"?key=59c3eda0"
      );
      setItemDetails(result.data);
    }

    useEffect(() => {
      fetchData();
    }, []);

    return(
        <>
        <Box sx={{width:{xs:0.9,sm:0.5,md: 0.3}, paddingTop:1}}>
            <ImgCarousel imgList = {itemDetails.imgList}/>  
        </Box>
        <Box sx={{width:{xs:0.9,sm:0.5,md: 0.3}, display: 'flex'}}>
            <Box sx={{width:0.3,height:1,textAlign:"center",justifyContent:"center"}}>
                <AspectRatio ratio="1/1"> 
                 <Avatar sx={{border:"solid 0.5px",borderColor:"black",justifyContent:"center",width: 0.5}} alt="thumbnail" src={itemDetails.profileURL}/> 
                </AspectRatio>
                <Box sx={{width:1, wordWrap: "break-word",fontSize: "10px",color:"black"}}>
                    {itemDetails.sellerName}
                </Box>
            </Box>
            <Box sx={{width:0.05}}></Box>
            <Box sx={{width: 1}}>
                <Box sx={{height:0.1}}></Box>
                <Box sx={{width:1, flexWrap:"wrap", wordWrap: "break-word",fontSize: {xs:"15px",sm:"20px",md: "20px"}, textAlign:"left",color:"black"}}>
                  {itemDetails.title}
                </Box>
                <Box sx={{marginTop:1,wordWrap: "break-word", fontSize: "12px", textAlign:"left", color:"#2596be"}}>
                    {itemDetails.location}
                </Box>
            </Box>
          </Box>
          {open ? (<ContactBox info={itemDetails}/>) : null}
          <Box sx={{color:"black",borderTop:"solid",width:{xs:0.9,sm:0.5,md: 0.3}, marginTop:1.5, paddingTop:1.5, textAlign:"left",marginBottom:7,fontSize: "15px"}}>
            {itemDetails.descriptions}
          </Box>
          <ClickAwayListener onClickAway={handleClickAway}>
            <Box sx={{position: "fixed",bottom: 20}}>
              <Button onClick={handleClick} color="success" variant="contained"> Contact info</Button>
            </Box>
          </ClickAwayListener>
        </>
    )
}