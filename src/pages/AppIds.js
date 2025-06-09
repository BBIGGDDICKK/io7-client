import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAuth } from '../context';
import Modal from '@mui/material/Modal';

import AppId from '../components/AppId'
import NewAppId from '../components/NewAppId'
const svr = window.location;
let rootURL = window.runtime.API_URL_ROOT || svr.protocol+'//'+svr.hostname+':2009';

const AppIds = () => {
    const { token, logout } = useAuth();
    const [appIds, setAppIds] = useState([]);
    const [deleted, setDeleted] = useState(false);
    const [added, setAdded] = useState(false);
    const [newApp, setNewApp] = useState(false);
    const [chosenApp, setChosenApp] = useState(undefined);

    useEffect(() => {
        fetch(rootURL + '/app-ids/', {
            method: 'GET',
            headers: { "Authorization": 'Bearer ' + token },
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                logout();
            }
        }).then((data) => {
            setAppIds(data);
        }).catch((err) => {
            console.log(err);
        });

        setAdded(false);
        setDeleted(false);
    }, [deleted, added]);
    
    const rows = appIds.map((app) => (
        {
            id: app.appId,
            createdDate: app.createdDate,
            appDesc: app.appDesc,
            navigate: <IconButton onClick={()=>setChosenApp(app)}>
                <AppRegistrationIcon/>
            </IconButton>
        }
    ));

    return (
        <div className="flex h-full bg-slate-50" style={{fontFamily: 'Inter, "Noto Sans", sans-serif'}}>
  <main className="flex-1 p-8 overflow-y-auto">
    {chosenApp ? (
      <AppId 
        chosenApp={chosenApp} 
        setDeleted={setDeleted} 
        setChosenApp={setChosenApp} 
      />
    ) : (
      <>
        {/* Modal */}
        <Modal
          open={newApp}
          onClose={() => setNewApp(false)}
          aria-labelledby="new-appid-modal-title"
          aria-describedby="new-appid-modal-description"
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none min-w-[400px]">
            <NewAppId 
              setNewApp={setNewApp} 
              setAdded={setAdded} 
              setChosenApp={setChosenApp} 
            />
          </div>
        </Modal>

        {/* Header */}
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-slate-900 text-4xl font-bold tracking-tight">앱 ID 리스트</h1>
          <button
            onClick={() => setNewApp(true)}
            className="flex items-center gap-2 rounded-lg border border-blue-300 bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <span>새로운 앱 ID</span>
          </button>
        </header>

        {/* App Table */}
        <section>
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-slate-600 text-xs font-semibold uppercase tracking-wider">
                    앱 ID
                  </th>
                  <th className="px-6 py-4 text-left text-slate-600 text-xs font-semibold uppercase tracking-wider">
                    설명
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 mr-3">
                          <span className="material-icons text-sm mr-1.5">apps</span>
                          APP
                        </span>
                        <span className="text-slate-800 text-sm font-medium">{row.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-600 text-sm max-w-xs truncate" title={row.appDesc}>
                        {row.appDesc}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-slate-600 text-sm">
                        <span className="material-icons text-sm mr-1.5">calendar_today</span>
                        {row.createdDate}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button 
                        onClick={() => setChosenApp(row)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-blue-600 hover:text-blue-800 hover:bg-blue-50 text-sm font-medium transition-colors"
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

        {/* Summary Cards */}
        <section className="mt-8">
          <h3 className="text-slate-900 text-2xl font-semibold leading-tight tracking-[-0.015em] mb-4">앱 통계</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2 rounded-xl p-6 border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-slate-700 text-base font-medium leading-normal">총 앱 개수</p>
              </div>
              <p className="text-slate-900 text-3xl font-bold leading-tight">{rows.length}</p>
            </div>
            <div className="flex flex-col gap-2 rounded-xl p-6 border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-slate-700 text-base font-medium leading-normal">이번 달 생성</p>
              </div>
              <p className="text-slate-900 text-3xl font-bold leading-tight">
                {rows.filter(row => {
                  const created = new Date(row.createdDate);
                  const now = new Date();
                  return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
                }).length}
              </p>
            </div>
            <div className="flex flex-col gap-2 rounded-xl p-6 border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-slate-700 text-base font-medium leading-normal">평균 설명 길이</p>
              </div>
              <p className="text-slate-900 text-3xl font-bold leading-tight">
                {rows.length > 0 ? Math.round(rows.reduce((acc, row) => acc + (row.appDesc?.length || 0), 0) / rows.length) : 0}
              </p>
            </div>
          </div>
        </section>
      </>
    )}
  </main>
</div>
    )
}

export default AppIds;