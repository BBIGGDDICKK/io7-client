import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useAuth } from "../context";
import "../style/Devices.css";

const svr = window.location;
let rootURL =
  window.runtime?.API_URL_ROOT || svr.protocol + "//" + svr.hostname + ":2009";

const NewDevice = (props) => {
  const { token } = useAuth();
  const { setChosenDevice, setAdded, setNewDev } = props;
  const [deviceType, setDeviceType] = React.useState("device");

  const getPassword = (pw) => {
    if (pw === "") {
      //generate the pw
      return Math.random().toString(36).slice(2, 10);
    } else {
      return pw;
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let pw = getPassword(event.target.password.value);

    fetch(rootURL + "/devices/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        devId: event.target.devId.value,
        devDesc: event.target.devDesc.value,
        createdBy: "admin",
        type: deviceType,
        createdDate: new Date(),
        password: pw,
        devMaker: event.target.devMaker.value,
        devModel: event.target.devModel.value,
        devSerial: event.target.devSerial.value,
        devHwVer: event.target.devHwVer.value,
        devFwVer: event.target.devFwVer.value,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          alert(`
                    device "(${event.target.devId.value})" created,
                    the password is "${pw}".
                    please take the password,
                    since it's not possible to see later.`);
          setAdded(true);
          setNewDev(false);
          setChosenDevice(undefined);
          return response.json();
        } else if (response.status === 409) {
          alert(`the Device or App Id "${event.target.devId.value}" exists.`);
          return [];
        } else if (response.status === 422) {
          alert("please check the data");
          return [];
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let handleTypeChange = (event) => {
    setDeviceType(event.target.value);
  };

  useEffect(() => {
    setClick2List("side-Devices");
    return () => {
      let side_tab = document.getElementById("side-Devices");
      if (side_tab && typeof side_tab.removeAttribute === "function") {
        side_tab.removeAttribute("onClick");
      }
    };
  }, []);

  let setClick2List = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.setAttribute("some-attribute", "some-value");
    }
  };

  return (
    <div className="new-device-container">
      <h1>신규 디바이스</h1>
      <Box mt={10} display="flex">
        <Form onSubmit={handleSubmit}>
          <Box m={2}>
            <TextField
              sx={{ boxShadow: 3 }}
              required
              id="devId"
              label="디바이스 ID"
              variant="filled"
            />
            <TextField
              sx={{ boxShadow: 3 }}
              id="password"
              label="토큰"
              variant="filled"
            />
          </Box>
          <Box m={2} sx={{ display: "flex", gap: 2 }}>
            <FormControl variant="filled" sx={{ boxShadow: 3, width: "100%" }}>
              <InputLabel id="device-type-label">디바이스 종류</InputLabel>
              <Select
                labelId="device-type-label"
                id="deviceType"
                value={deviceType}
                label="디바이스 종류"
                onChange={handleTypeChange}
              >
                <MenuItem value="device">디바이스</MenuItem>
                <MenuItem value="gateway">게이트웨이</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box m={2}>
            <TextField
              id="devDesc"
              label="설명명"
              multiline
              rows={3}
              style={{ width: "100%" }}
            />
          </Box>
          <Box m={2}>
            <TextField
              sx={{ boxShadow: 3 }}
              id="devMaker"
              label="제조업체"
              variant="filled"
            />
            <TextField
              sx={{ boxShadow: 3 }}
              id="devSerial"
              label="시리얼 넘버"
              variant="filled"
            />
          </Box>
          <Box m={2}>
            <TextField
              sx={{ boxShadow: 3 }}
              id="devModel"
              label="모델델"
              variant="filled"
            />
            <TextField
              sx={{ boxShadow: 3 }}
              id="devHwVer"
              label="하드웨어 버전전"
              variant="filled"
            />
          </Box>
          <Box m={2} sx={{ display: "flex", gap: 2 }}>
            <TextField
              sx={{ boxShadow: 3, width: "50%" }}
              id="devFwVer"
              label="펌웨어 버전"
              variant="filled"
            />
          </Box>

          <Button variant="contained" type="submit">
            만들기
          </Button>
        </Form>
      </Box>
    </div>
  );
};

export default NewDevice;
