import React, { useEffect } from 'react';
import { Button, Box , TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../context';

const svr = window.location;
let rootURL = window.runtime.API_URL_ROOT || svr.protocol+'//'+svr.hostname+':2009';

const AppId = (props) => {
    const { token } = useAuth();
    const { appId, appDesc, restricted } = props.chosenApp;
    const { setChosenApp, setDeleted } = props;

    const deleteAppId = (event) => {

        if(window.confirm('Do you really want to delete this App Id?')) {
            fetch(rootURL + '/app-ids/' + appId, {
                method: 'DELETE',
                headers: { "Content-Type": "application/json",
                        "Authorization": 'Bearer ' + token },
            }).then((response) => {
                if (response.ok) {
                    alert(`App Id "(${appId})" deleted`);
                    setChosenApp(undefined) 
                    setDeleted(true) 
                }
                return;
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    useEffect(() => {
        return () => {
            let side_tab = document.getElementById('side-Apps');
            if (side_tab && typeof side_tab.removeAttribute === 'function') {
                side_tab.removeAttribute('onClick');
            }
        };
    }, [])

    let setClick2List = (id) => {
        let side_tab = document.getElementById(id);
        side_tab.setAttribute('onClick', 'location.reload()')
    }

    return (
        <div>
            <div>
                {setClick2List('side-Apps')}
                <Box sx={{display: 'flex', justifyContent: 'space-between' }}>
                    <Button startIcon={<ArrowBackIcon />}  variant="contained" onClick={() => { setChosenApp(undefined) }}>목록으로 돌아가기</Button>
                    <Button startIcon={<DeleteIcon />} variant="contained" onClick={() => { deleteAppId() }}>삭제하기</Button>
                </Box>
                <hr/>
            </div>
            <div class='app-container'>
                <h1>App Id Information : {appId}</h1>
                <Box m={2} >
                    <TextField InputProps={{readOnly: true,}} sx={{ boxShadow: 3 }} value={appId} label="Application Id" variant="filled" />
                    <TextField InputProps={{readOnly: true,}} sx={{ boxShadow: 3 }} 
                        value={restricted ? 'Restricted': 'All Devices'} label="Device Access" variant="filled" />
                </Box> 
                <Box m={2}>
                    <TextField InputProps={{readOnly: true,}} value={appDesc} label="Description" multiline rows={3}  
                        style={{width:'390px'}}/>
                </Box>
            </div>
        </div>
    )
}

export default AppId;