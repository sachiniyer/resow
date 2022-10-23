import * as React from 'react';
import MailIcon from '@mui/icons-material/Mail';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import PhoneIcon from '@mui/icons-material/Phone';

import Divider from '@mui/material/Divider';


export default function Message(props){

    return (
        <List sx={{zIndex: 1,width: { xs: 0.9, sm: 0.7, md: 0.5 },maxWidth: 360,border: 'solid 1px',bgcolor: 'white',position:"fixed",borderRadius:2}}>

            <ListItem>
                <ListItemAvatar>
                <Avatar>
                    <MailIcon/>
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary={props.info.email} sx={{color:"black"}}/>
            </ListItem>

            <Divider variant="inset" component="li" />

            <ListItem>
                <ListItemAvatar>
                <Avatar>
                    <PhoneIcon />
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary={props.info.phone} sx={{color:"black"}}/>
            </ListItem>

        </List>
    )
}