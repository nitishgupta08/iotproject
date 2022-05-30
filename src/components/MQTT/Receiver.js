import React, { useEffect, useState } from 'react';
import { Card, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';

const Receiver = ({ payload }) => {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        if (payload.topic) {
            setMessages(messages => [...messages, payload])
        }
    }, [payload])


    return (
        <Card sx={{ ml: 2, mr: 2, mt: 1, mb: 2, minHeight: 100 }}>
            <Typography variant="h4" sx={{ m: 2 }}>Receiver</Typography>
            {messages.length === 0 ? <Typography variant="h4" sx={{ m: 1 }} > No Data</Typography> : <List>
                {messages.map((data, i) => {
                    return <ListItem key={i}>
                        <ListItemAvatar>
                            <Avatar>
                                <EmailIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={data.topic} secondary={"message: " + data.message} primaryTypographyProps={{ fontSize: 20, fontWeight: 'bold', }} secondaryTypographyProps={{ fontSize: 23 }} />
                    </ListItem>;
                })}
            </List>}

        </Card >
    );
}

export default Receiver;
