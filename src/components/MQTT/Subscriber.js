import React, { useContext, useState } from 'react';
import { Card, Button, Select, Typography, Grid, MenuItem, TextField } from '@mui/material';
import { QosOption } from './index'

const Subscriber = ({ sub, unSub, showUnsub }) => {
    const qosOptions = useContext(QosOption);
    const [record, setRecord] = useState({
        topic: 'iot',
        qos: 0,
    })

    const handleSubmit = () => {
        sub(record);
    };

    const handleUnsub = () => {
        unSub(record);
    };

    return (
        <Card sx={{ ml: 1, mt: 1, height: 500 }}>
            <Typography variant="h4" sx={{ m: 2 }}>Subscriber</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{ m: 1 }} >
                    <TextField
                        id="topic"
                        label="topic"
                        sx={{ mr: 1, width: 350 }}
                        onChange={(e) => setRecord({ ...record, topic: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sx={{ m: 8 }} >
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
                <Grid item xs={12}>
                    {
                        showUnsub
                            ?
                            <Button variant="outlined" color="error" sx={{ m: 9 }} onClick={handleUnsub}>
                                Unsubscribe
                            </Button>
                            : <Button variant="contained" sx={{ m: 9 }} onClick={handleSubmit} >
                                Subscribe
                            </Button>

                    }


                </Grid>


            </Grid>

        </Card >
    );
}

export default Subscriber;
