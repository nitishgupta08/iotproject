import React, { useContext, useState } from 'react';
import { Card, Button, TextField, Select, Typography, Grid, MenuItem } from '@mui/material';
import { QosOption } from './index'

const Publisher = ({ publish }) => {
    const qosOptions = useContext(QosOption);
    const [record, setRecord] = useState({
        topic: 'iot',
        qos: 0,
        payload: ""
    })


    const handleSubmit = () => {
        publish(record)
    };


    return (
        <Card sx={{ mr: 2, mt: 1, height: 500 }} >
            <Typography variant="h4" sx={{ m: 2 }}>Publisher</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{ m: 1 }} >

                    <TextField
                        id="topic"
                        label="topic"
                        sx={{ mr: 1, width: 350 }}
                        onChange={(e) => setRecord({ ...record, topic: e.target.value })}
                    />
                </Grid>

                <Grid item xs={12} sx={{ m: 1 }} >
                    <Typography variant="p">QoS: </Typography>
                    <Select label="QoS"
                        name="qos"
                        value={record.qos}
                        onChange={(e) => setRecord({ ...record, qos: e.target.value })}
                        sx={{ ml: 3 }} >
                        <MenuItem value={qosOptions[0]}>0</MenuItem>
                        <MenuItem value={qosOptions[1]}>1</MenuItem>
                        <MenuItem value={qosOptions[2]}>2</MenuItem>
                    </Select>

                </Grid>
                <Grid item xs={12} sx={{ m: 1 }} >
                    <TextField
                        id="outlined-multiline-static"
                        label="Payload"
                        multiline
                        rows={4}
                        sx={{ mr: 1, width: 350 }}
                        onChange={(e) => setRecord({ ...record, payload: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sx={{ m: 2 }} >
                    <Button variant="contained" sx={{ m: 2 }} onClick={handleSubmit}>
                        Publish
                    </Button>
                </Grid>
            </Grid>
        </Card >
    );
}

export default Publisher;
