import React, { createContext, useEffect, useState } from 'react';
import Connection from './Connection';
import Publisher from './Publisher';
import Subscriber from './Subscriber';
import Receiver from './Receiver';
import { Grid } from '@mui/material';
import * as mqtt from 'mqtt/dist/mqtt.min';


export const QosOption = createContext([])
const qosOption = [0, 1, 2];

const MQTT = ({ snackBar }) => {
    const [client, setClient] = useState(null);
    const [isSubed, setIsSub] = useState(false);
    const [payload, setPayload] = useState({});
    const [connectStatus, setConnectStatus] = useState('Connect');


    const mqttConnect = (host, mqttOption) => {
        setConnectStatus('Connecting');
        setClient(mqtt.connect(host, mqttOption));
    };

    useEffect(() => {
        if (client) {
            client.on('connect', () => {
                setConnectStatus('Connected');
            });
            client.on('error', (err) => {
                console.error('Connection error: ', err);
                client.end();
            });
            client.on('reconnect', () => {
                setConnectStatus('Reconnecting');
            });
            client.on('message', (topic, message) => {
                const payload = { topic, message: message.toString() };
                setPayload(payload);
            });
        }
    }, [client]);

    const mqttDisconnect = () => {
        if (client) {
            client.end(() => {
                setConnectStatus('Connect');
            });
        }
    }

    const mqttPublish = (context) => {
        if (client) {
            const { topic, qos, payload } = context;
            client.publish(topic, payload, { qos }, error => {
                if (error) {
                    console.log('Publish error: ', error);
                    snackBar("Broker disconnected or not subscribed to topic")
                    return
                }
            });
        }
    }

    const mqttSub = (subscription) => {
        if (client) {
            const { topic, qos } = subscription;
            client.subscribe(topic, { qos }, (error) => {
                if (error) {
                    console.log('Subscribe to topics error', error)
                    snackBar("Broker disconnected or not subscribed to topic")
                    return
                }
                setIsSub(true)
            });
        }
    };

    const mqttUnSub = (subscription) => {
        if (client) {
            const { topic } = subscription;
            client.unsubscribe(topic, error => {
                if (error) {
                    console.log('Unsubscribe error', error)
                    snackBar("Broker disconnected or not subscribed to topic")
                    return
                }
                setIsSub(false)
            });
        }
    };


    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Connection connect={mqttConnect} disconnect={mqttDisconnect} connectBtn={connectStatus} />
                </Grid>
                <QosOption.Provider value={qosOption}>
                    <Grid item xs={4}>
                        <Subscriber sub={mqttSub} unSub={mqttUnSub} showUnsub={isSubed} />
                    </Grid>
                    <Grid item xs={4}>
                        <Publisher publish={mqttPublish} />
                    </Grid>
                </QosOption.Provider>
                <Grid item xs={12}>
                    <Receiver payload={payload} />
                </Grid>
            </Grid>


        </>
    );
}



export default MQTT;

