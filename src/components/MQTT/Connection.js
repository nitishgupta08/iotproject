import React, { useState } from 'react';
import { Card, Button, CardContent, CardActions, TextField, Typography } from '@mui/material';

const Connection = ({ connect, disconnect, connectBtn }) => {
    const [record, setRecord] = useState({
        host: 'broker.emqx.io',
        clientId: `mqttjs_ + ${Math.random().toString(16).substr(2, 8)}`,
        port: 8083,
        username: '',
        password: ''
    })

    const handleConnect = () => {
        const { host, clientId, port, username, password } = record;
        const url = `ws://${host}:${port}/mqtt`;
        const options = {
            keepalive: 30,
            protocolId: 'MQTT',
            protocolVersion: 4,
            clean: true,
            reconnectPeriod: 1000,
            connectTimeout: 30 * 1000,
            will: {
                topic: 'WillMsg',
                payload: 'Connection Closed abnormally..!',
                qos: 0,
                retain: false
            },
            rejectUnauthorized: false
        };
        options.clientId = clientId;
        options.username = username;
        options.password = password;
        connect(url, options);
    };

    const handleDisconnect = () => {
        disconnect();
    };

    const ConnectionForm = (
        <>

            <TextField
                sx={{ width: 400, mb: 1, mt: 1 }}
                variant="outlined"
                label="Host"
                name="host"
                value={record.host}
                onChange={(e) => setRecord({ ...record, host: e.target.value })}
            />


            <TextField
                sx={{ width: 400, mb: 1 }}
                variant="outlined"
                label="Port"
                name="port"
                value={record.port}
                onChange={(e) => setRecord({ ...record, port: e.target.value })}

            />
            <TextField
                sx={{ width: 400, mb: 1 }}
                variant="outlined"
                label="Client ID"
                name="clientId"
                value={record.clientId}
                onChange={(e) => setRecord({ ...record, clientId: e.target.value })}

            />
            <TextField
                sx={{ width: 400, mb: 1 }}
                variant="outlined"
                label="Username"
                name="username"
                onChange={(e) => setRecord({ ...record, username: e.target.value })}

            />
            <TextField
                sx={{ width: 400, mb: 1 }}
                variant="outlined"
                label="Password"
                name="password"
                onChange={(e) => setRecord({ ...record, password: e.target.value })}

            />
        </>
    )

    return (
        <Card sx={{ maxWidth: 450, ml: 2, mt: 1, height: 500 }}>
            <CardContent>
                <Typography variant="h4" sx={{ m: 1 }}>Connection (Broker)</Typography>
                {ConnectionForm}
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: "space-between", m: 2 }}>
                {connectBtn === 'Connect' ? <Button variant="contained" onClick={handleConnect}>Connect</Button> :
                    (<>
                        {connectBtn === 'Connecting' ? <Button variant="contained" color="warning" onClick={handleConnect}>Connecting</Button> : <Button variant="contained" color="success" onClick={handleConnect}>Connected</Button>}

                        <Button variant="outlined" color="error" onClick={handleDisconnect}>Disconnect</Button>
                    </>)}
            </CardActions>
        </Card >
    );
}

export default Connection;
