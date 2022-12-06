import * as React from 'react';
import { useEffect, useState, Fragment } from 'react';
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

let instanceCount = 0

export default function PreviewWindow(props) {
  let navigate = useNavigate()
  let [instanceCheck, setInstanceCheck] = useState(true)
  let [time, setTime] = useState(0)
  let [clickable, setClickable] = useState(0)

  let handleClick = () => {
    const d = new Date()
    if (d - time > 100) {
      return navigate(props.href)

    }
  }

  useEffect(() => {
    instanceCount++
    const d = new Date()
    setTime(d)
    if (instanceCount > 1) {
      setInstanceCheck(false)
    }
  }, [])

  useEffect(() => {
    if (props.clickable && !clickable) {

      const d = new Date()
      setClickable(true)
      setTime(d)
    }
    if (!props.clickable && clickable) {
      setClickable(false)
    }
  })

  useEffect(() => {
    return () => {
      instanceCount--
    }
  }, [])

  return (instanceCheck ? (
    <Card 
    component={"div"} 
    onMouseDown={handleClick} 
    sx={{ 
      display: 'flex', 
      width: 0.9, 
      maxWidth: 200, 
      height: 0.9, 
      maxHeight: 300, 
      borderRadius: '5%' 
    }}
    >
      <CardActionArea>
        <CardMedia
          style={{ borderBottom: "solid 0.7px" }}
          component="img"
          height="200"
          image={props.image}
          alt="thumbnail"
        />
        <CardContent>
          <Box sx={{ display: 'grid', gap: 0, gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <Box sx={{ width: 60 }}>
              <Avatar sx={{ border: "solid 0.7px", width: 60, height: 60, marginLeft: -1, marginTop: -1 }} alt="thumbnail" src={props.profile} />
              <Box sx={{ width: 80, wordWrap: "break-word", marginTop: 0, marginLeft: -2, fontSize: 10 }}>
                {props.seller}
              </Box>
            </Box>
            <Box sx={{ width: 120 }}>
              <Box sx={{ width: 100, marginTop: 1, marginLeft: 1, fontSize: 10, textAlign: "left",maxWidth:"90px" }}>
                {props.title}
              </Box>
              <Box sx={{ width: 100, marginTop: 1.5, marginLeft: 1, fontSize: 10, textAlign: "left", color: "#2596be",maxWidth:"90px"  }}>
                {props.location}
              </Box>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  ) : <Fragment></Fragment>)
}
