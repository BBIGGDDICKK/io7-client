import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MemoryIcon from '@mui/icons-material/Memory';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAuth, useMQTT } from '../context';

import Device from '../components/Device';
import NewDevice from '../components/NewDevice';

import "../style/Devices.css";

// it assumes the mqtt and the management console web is on the same hosts.
// if they are on different hosts, the the following two lines should be modified.
const svr = window.location;
const rootURL = window.runtime.API_URL_ROOT || svr.protocol+'//'+svr.hostname+':2009';
const ws_protocol = window.runtime.ws_protocol || 'ws://';
const mqtturl = window.runtime.WS_SERVER_URL  || ws_protocol + svr.hostname + ':9001';
const mqtt_options = window.runtime.mqtt_options;
let forRefresh = 0;

const Devices = () => {
    const { token, logout } = useAuth();
    const { mqttClient, mqtt_connect } = useMQTT();
    const [devices, setDevices] = useState([]);
    const [deleted, setDeleted] = useState(false);
    const [added, setAdded] = useState(false);
    const [newDev, setNewDev] = useState(false);
    const [chosenDevice, setChosenDevice] = useState(undefined);

    useEffect(() => {
        if(mqttClient === null) {
            mqtt_options.password = token;
            mqtt_options.clientId = 'web_' + Math.round(Math.random() * 100000);
            mqtt_connect(mqtturl, mqtt_options);
        }
    }, [mqttClient]);

    forRefresh++;

    useEffect(() => {
        fetch(rootURL + '/devices/', {
            method: 'GET',
            headers: { "Authorization": 'Bearer ' + token },
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                logout();
            }
        }).then((data) => {
            setDevices(data);
        }).catch((err) => {
            console.log(err);
        });

        setAdded(false);
        setDeleted(false);
    }, [deleted, added]);

    useEffect(() => {
        if(mqttClient) {
            mqttClient.subscribe('iot3/+/evt/connection/fmt/json', {qos:0});
            function msgHandler (topic, message) {
                let mObj = JSON.parse(message.toString());
                if (mObj.d && mObj.d.status) {
                    let devId = topic.split('/')[1];
                    let statusCell = document.getElementById(devId + '-status');
                    if (statusCell) {
                        if (mObj.d.status === 'online') {
                            statusCell.innerHTML = 'on';
                        } else if (mObj.d.status === 'offline') {
                            statusCell.innerHTML = 'off';
                        }
                    }
                }
            };
            mqttClient.on('message', msgHandler);
    
            return () => {
                mqttClient.unsubscribe('iot3/+/evt/connection/fmt/json');
                mqttClient.removeListener('message', msgHandler);
            };
        }
    }, [mqttClient, forRefresh]);

    const rows = devices.map((device) => (
        {
            id: device.devId,
            online: device.status || 'off',
            createdDate: device.createdDate,
            type: device.type,
            createdBy: device.createdBy,
            navigate: <IconButton onClick={()=>setChosenDevice(device)}>
                <MemoryIcon/>
            </IconButton>
        }
    ));

    return (
        <div className="devices-container">
            {chosenDevice ?
                (
                    <Device chosenDevice={chosenDevice} setDeleted={setDeleted} setChosenDevice={setChosenDevice} />
                ) : (
                    <div>
                        {newDev && <NewDevice setNewDev={setNewDev} setAdded={setAdded} setChosenDevice={setChosenDevice} />}
                        {!newDev && <>
                            <div className='newDevTitle'>
                                <h1>디바이스 목록</h1>
                                <Button startIcon={<MemoryIcon/>} sx={{ height: '36.5px' }} size="medium" variant="contained" onClick={()=>{setNewDev(true)}}>디바이스 등록</Button>
                            </div>
                            <TableContainer sx={{ height: 700, width: '100%' }} component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>디바이스 ID</TableCell>
                                            <TableCell>연결 여부</TableCell>
                                            <TableCell>종류</TableCell>
                                            <TableCell>생성자</TableCell>
                                            <TableCell>생성일</TableCell>
                                            <TableCell>정보</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <TableRow
                                                key={row.id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell>{row.id}</TableCell>
                                                <TableCell id={row.id + '-status'}>{row.online}</TableCell>
                                                <TableCell>{row.type}</TableCell>
                                                <TableCell>{row.createdBy}</TableCell>
                                                <TableCell>{row.createdDate}</TableCell>
                                                <TableCell>{row.navigate}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </>}
                    </div>
                )
            }
        </div>
    )
}

export default Devices;
