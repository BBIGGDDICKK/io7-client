import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import '../../style/Devices.css';

const Detail = (props) => {
    const { devId, devDesc, type, devMaker, 
            devModel, devSerial, devHwVer, devFwVer, } = props.chosenDevice;

    return (
        <div>
            <h1>Device Information : </h1>
            <Box m={2} >
                <TextField InputProps={{readOnly: true,}} sx={{ boxShadow: 3 }} value={devId} label="Device Id" variant="filled" />
                <TextField InputProps={{readOnly: true,}} sx={{ boxShadow: 3 }} value={type} label="Device Type" variant="filled" />
            </Box> 
            
            <Box m={2}>
                <TextField InputProps={{readOnly: true,}} value={devDesc} label="Description" multiline rows={3}  style={{width:'100%'}}/>
            </Box>
            
            <Box m={2} >
                <TextField InputProps={{readOnly: true,}} sx={{ boxShadow: 3 }} value={devMaker} label="Manufacturer" variant="filled" />
                <TextField InputProps={{readOnly: true,}} sx={{ boxShadow: 3 }} value={devSerial} label="Hardware Version" variant="filled" />
            </Box> 
            <Box m={2}>
                <TextField InputProps={{readOnly: true,}} sx={{ boxShadow: 3 }} value={devModel} label="Model" variant="filled" />
                <TextField InputProps={{readOnly: true,}} sx={{ boxShadow: 3 }} value={devHwVer} label="Hardware Version" variant="filled" />
            </Box>
            <Box m={2}>
                <TextField InputProps={{readOnly: true,}} sx={{ boxShadow: 3 }} value={devFwVer} label="Firmware Version" variant="filled" />
            </Box>
        </div>
    )
}

export default Detail;

