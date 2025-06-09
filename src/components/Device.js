import React, { useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Detail from './panel/Detail'
import Event from './panel/Event'
import Meta from './panel/Meta'
import Actions from './panel/Actions'
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth, useMQTT } from '../context';

const svr = window.location;
let rootURL = window.runtime.API_URL_ROOT || svr.protocol+'//'+svr.hostname+':2009';

const Device = (props) => {
    const {devId} = props.chosenDevice;
    const { token } = useAuth();
    const {setChosenDevice, setDeleted} = props;
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const deleteDevice = (event) => {

        if(window.confirm('Do you really delete this device?')) {
            fetch(rootURL + '/devices/' + devId, {
                method: 'DELETE',
                headers: { "Content-Type": "application/json",
                        "Authorization": 'Bearer ' + token },
            }).then((response) => {
                if (response.ok) {
                    alert(`device "(${devId})" deleted`);
                    setChosenDevice(undefined) 
                    setDeleted(true) 
                }
                return;
            }).catch((err) => {
                console.log(err);
            }).catch((err) => {
                console.log(err);
            });
        }
    }
    function TabPanel(props) {
        const { children, value, index, ...other } = props;
    
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`vertical-tabpanel-${index}`}
                aria-labelledby={`vertical-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <div>{children}</div>
                    </Box>
                )}
            </div>
        );
    }
    
    function a11yProps(index) {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        };
    }

    useEffect(() => {
        return () => {
            let side_tab = document.getElementById('side-Devices');
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
        <>
            {setClick2List('side-Devices')}
            <Box sx={{display: 'flex', justifyContent: 'space-between' }}>
                <Button startIcon={<ArrowBackIcon />} variant="contained" onClick={() => { setChosenDevice(undefined) }}>목록으로 돌아가기</Button>
                <Button startIcon={<DeleteIcon />} variant="contained" onClick={() => { deleteDevice() }}>삭제하기</Button>
            </Box>
            <hr />
            <Box
                sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%' }}
            >
                <Tabs
                    orientation="vertical"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs"
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                >
                    <Tab label="Detail" {...a11yProps(0)} />
                    <Tab label="Event" {...a11yProps(1)} />
                    <Tab label="Meta" {...a11yProps(2)} />
                    <Tab label="Device Actions" {...a11yProps(3)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <Detail {...props} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Event {...props}/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Meta {...props}/>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <Actions {...props}/>
                </TabPanel>
            </Box>
        </>
    );
}

export default Device;