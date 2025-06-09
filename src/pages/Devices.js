import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MemoryIcon from "@mui/icons-material/Memory";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import { useAuth, useMQTT } from "../context";

import Device from "../components/Device";
import NewDevice from "../components/NewDevice";

import "../style/Devices.css";

// it assumes the mqtt and the management console web is on the same hosts.
// if they are on different hosts, the the following two lines should be modified.
const svr = window.location;
const rootURL =
  window.runtime?.API_URL_ROOT || svr.protocol + "//" + svr.hostname + ":2009";
const ws_protocol = window.runtime?.ws_protocol || "ws://";
const mqtturl =
  window.runtime?.WS_SERVER_URL || ws_protocol + svr.hostname + ":9001";
const mqtt_options = window.runtime?.mqtt_options;
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
    if (mqttClient === null) {
      mqtt_options.password = token;
      mqtt_options.clientId = "web_" + Math.round(Math.random() * 100000);
      mqtt_connect(mqtturl, mqtt_options);
    }
  }, [mqttClient]);

  forRefresh++;

  useEffect(() => {
    fetch(rootURL + "/devices/", {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          logout();
        }
      })
      .then((data) => {
        setDevices(data);
      })
      .catch((err) => {
        console.log(err);
      });

    setAdded(false);
    setDeleted(false);
  }, [deleted, added]);

  useEffect(() => {
    if (mqttClient) {
      mqttClient.subscribe("iot3/+/evt/connection/fmt/json", { qos: 0 });
      function msgHandler(topic, message) {
        let mObj = JSON.parse(message.toString());
        if (mObj.d && mObj.d.status) {
          let devId = topic.split("/")[1];
          let statusCell = document.getElementById(devId + "-status");
          if (statusCell) {
            if (mObj.d.status === "online") {
              statusCell.innerHTML = "on";
            } else if (mObj.d.status === "offline") {
              statusCell.innerHTML = "off";
            }
          }
        }
      }
      mqttClient.on("message", msgHandler);

      return () => {
        mqttClient.unsubscribe("iot3/+/evt/connection/fmt/json");
        mqttClient.removeListener("message", msgHandler);
      };
    }
  }, [mqttClient, forRefresh]);

  const rows = devices.map((device) => ({
    id: device.devId,
    online: device.status || "off",
    createdDate: device.createdDate,
    type: device.type,
    createdBy: device.createdBy,
    navigate: (
      <IconButton onClick={() => setChosenDevice(device)}>
        <MemoryIcon />
      </IconButton>
    ),
  }));

  return (
    <div
      className="flex h-full bg-slate-50"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <main className="flex-1 p-8 overflow-y-auto">
        {chosenDevice ? (
          <Device
            chosenDevice={chosenDevice}
            setDeleted={setDeleted}
            setChosenDevice={setChosenDevice}
          />
        ) : (
          <>
            {/* Modal */}
            <Modal
              open={newDev}
              onClose={() => setNewDev(false)}
              aria-labelledby="new-device-modal-title"
              aria-describedby="new-device-modal-description"
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none min-w-[400px]">
                <NewDevice
                  setNewDev={setNewDev}
                  setAdded={setAdded}
                  setChosenDevice={setChosenDevice}
                />
              </div>
            </Modal>

            {/* Header */}
            <header className="mb-8 flex items-center justify-between">
              <h1 className="text-slate-900 text-4xl font-bold tracking-tight">
                디바이스 목록
              </h1>
              <button
                onClick={() => setNewDev(true)}
                className="flex items-center gap-2 rounded-lg border border-blue-300 bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                <span>디바이스 등록</span>
              </button>
            </header>

            {/* Device Table */}
            <section>
              <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-slate-600 text-xs font-semibold uppercase tracking-wider">
                        디바이스 ID
                      </th>
                      <th className="px-6 py-4 text-left text-slate-600 text-xs font-semibold uppercase tracking-wider">
                        연결 여부
                      </th>
                      <th className="px-6 py-4 text-left text-slate-600 text-xs font-semibold uppercase tracking-wider">
                        종류
                      </th>
                      <th className="px-6 py-4 text-left text-slate-600 text-xs font-semibold uppercase tracking-wider">
                        생성자
                      </th>
                      <th className="px-6 py-4 text-left text-slate-600 text-xs font-semibold uppercase tracking-wider">
                        생성일
                      </th>
                      <th className="px-6 py-4 text-left text-slate-600 text-xs font-semibold uppercase tracking-wider">
                        정보
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {rows.map((row) => (
                      <tr
                        key={row.id}
                        className="hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-slate-800 text-sm font-medium">
                          {row.id}
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap"
                          id={row.id + "-status"}
                        >
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                              row.online === "온라인" || row.online === "Online"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            <span className="material-icons text-sm mr-1.5">
                              {row.online === "온라인" ||
                              row.online === "Online"
                                ? "wifi"
                                : "wifi_off"}
                            </span>
                            {row.online}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-slate-600 text-sm">
                          {row.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-slate-600 text-sm">
                          {row.createdBy}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-slate-600 text-sm">
                          {row.createdDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-slate-600 text-sm">
                          <button
                            onClick={() => setChosenDevice(row)}
                            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                          >
                            <span className="material-icons text-sm">info</span>
                            상세보기
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default Devices;
