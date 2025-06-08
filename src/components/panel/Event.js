import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import "../../style/Event.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useMQTT } from '../../context';

const Event = (props) => {
    const { devId } = props.chosenDevice;
    const { mqttClient } = useMQTT();

    useEffect(() => {
        mqttClient.subscribe(`iot3/${devId}/evt/status/fmt/json`, {qos:0});
        function msgHandler (topic, message) {
            let eventTable = document.getElementById("eventList"); 
            let row = eventTable.insertRow(1);
            let evtTime = row.insertCell(0);
            let evt = row.insertCell(1);
            evt.innerHTML = message.toString();
            evtTime.innerHTML = (new Date()).toLocaleTimeString();
        };
        mqttClient.on('message', msgHandler);

        return () => {
            mqttClient.unsubscribe(`iot3/${devId}/evt/status/fmt/json`);
            mqttClient.removeListener('message', msgHandler);
        };
    }, [])

    return (
        <>
            <h1>Device Id : {devId}</h1>
            <TableContainer sx={{ height: 700, width: '100%' }} component={Paper}>
                <Table id='eventList' sx={{ minWidth: 750 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: 80 }}><b>Time</b></TableCell>
                            <TableCell><b>Event</b></TableCell>
                        </TableRow>
                    </TableHead>
                        <tbody>
                        </tbody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Event;