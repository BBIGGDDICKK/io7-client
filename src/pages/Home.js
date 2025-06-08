import React, {useState, useEffect} from 'react';
import HomeIcon from '@mui/icons-material/Home';
import MemoryIcon from '@mui/icons-material/Memory';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import SettingsIcon from '@mui/icons-material/Settings';

const Home = () => {
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' or 'detail'
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilter, setShowFilter] = useState(false);
  
  const [seats, setSeats] = useState([
    {
      id: 1,
      name: 'Seat 1',
      isOccupied: true,
      powerOn: true,
      powerConsumption: 50,
      startTime: '오전 8:30',
      occupiedHours: 2,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJQVF_H1LY1e4gIUv1Bii3Z5VH0NKKI13MtqXs9jRb8KSG_RPQ24uewkOWm8p2En1dMWwCLX6hadPBvKF3oxejuYD-QSWDJ0X0SVqESm3AWKqjtKlsj5WzYfyXg98NopqWu1MekShc2yVM3AtqDeK6slcvDxoI7A-SUyWOnWNjRdMTrfEARmDG3QzC_8ut3a0YtgiNoWdpzXnXEl9xzHUAjLeLpIXKPhlWTzSf-fnqab-qirL2BvEYDY-vs1RsqneIv1sMl6frw_cR'
    },
    {
      id: 2,
      name: 'Seat 2',
      isOccupied: false,
      powerOn: false,
      powerConsumption: 0,
      startTime: '-',
      occupiedHours: 0,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJQVF_H1LY1e4gIUv1Bii3Z5VH0NKKI13MtqXs9jRb8KSG_RPQ24uewkOWm8p2En1dMWwCLX6hadPBvKF3oxejuYD-QSWDJ0X0SVqESm3AWKqjtKlsj5WzYfyXg98NopqWu1MekShc2yVM3AtqDeK6slcvDxoI7A-SUyWOnWNjRdMTrfEARmDG3QzC_8ut3a0YtgiNoWdpzXnXEl9xzHUAjLeLpIXKPhlWTzSf-fnqab-qirL2BvEYDY-vs1RsqneIv1sMl6frw_cR'
    },
    {
      id: 3,
      name: 'Seat 3',
      isOccupied: true,
      powerOn: true,
      powerConsumption: 75,
      startTime: '오전 7:30',
      occupiedHours: 3,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJQVF_H1LY1e4gIUv1Bii3Z5VH0NKKI13MtqXs9jRb8KSG_RPQ24uewkOWm8p2En1dMWwCLX6hadPBvKF3oxejuYD-QSWDJ0X0SVqESm3AWKqjtKlsj5WzYfyXg98NopqWu1MekShc2yVM3AtqDeK6slcvDxoI7A-SUyWOnWNjRdMTrfEARmDG3QzC_8ut3a0YtgiNoWdpzXnXEl9xzHUAjLeLpIXKPhlWTzSf-fnqab-qirL2BvEYDY-vs1RsqneIv1sMl6frw_cR'
    },
    {
      id: 4,
      name: 'Seat 4',
      isOccupied: false,
      powerOn: false,
      powerConsumption: 0,
      startTime: '-',
      occupiedHours: 0,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJQVF_H1LY1e4gIUv1Bii3Z5VH0NKKI13MtqXs9jRb8KSG_RPQ24uewkOWm8p2En1dMWwCLX6hadPBvKF3oxejuYD-QSWDJ0X0SVqESm3AWKqjtKlsj5WzYfyXg98NopqWu1MekShc2yVM3AtqDeK6slcvDxoI7A-SUyWOnWNjRdMTrfEARmDG3QzC_8ut3a0YtgiNoWdpzXnXEl9xzHUAjLeLpIXKPhlWTzSf-fnqab-qirL2BvEYDY-vs1RsqneIv1sMl6frw_cR'
    },
    {
      id: 5,
      name: 'Seat 5',
      isOccupied: true,
      powerOn: true,
      powerConsumption: 125,
      startTime: '오전 5:30',
      occupiedHours: 5,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJQVF_H1LY1e4gIUv1Bii3Z5VH0NKKI13MtqXs9jRb8KSG_RPQ24uewkOWm8p2En1dMWwCLX6hadPBvKF3oxejuYD-QSWDJ0X0SVqESm3AWKqjtKlsj5WzYfyXg98NopqWu1MekShc2yVM3AtqDeK6slcvDxoI7A-SUyWOnWNjRdMTrfEARmDG3QzC_8ut3a0YtgiNoWdpzXnXEl9xzHUAjLeLpIXKPhlWTzSf-fnqab-qirL2BvEYDY-vs1RsqneIv1sMl6frw_cR'
    }
  ]);

  // 실시간 시간 업데이트
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSeatClick = (seat) => {
    setSelectedSeat(seat);
    setCurrentView('detail');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedSeat(null);
  };

  const updateSeat = (updatedSeat) => {
    setSeats(prevSeats => 
      prevSeats.map(seat => 
        seat.id === updatedSeat.id ? updatedSeat : seat
      )
    );
    setSelectedSeat(updatedSeat);
  };

  const togglePower = () => {
    if (selectedSeat) {
      const updatedSeat = {
        ...selectedSeat,
        powerOn: !selectedSeat.powerOn,
        powerConsumption: !selectedSeat.powerOn ? 15 : 0
      };
      updateSeat(updatedSeat);
    }
  };

  const toggleOccupancy = () => {
    if (selectedSeat) {
      const updatedSeat = {
        ...selectedSeat,
        isOccupied: !selectedSeat.isOccupied,
        startTime: !selectedSeat.isOccupied ? '오후 12:00' : '-',
        occupiedHours: !selectedSeat.isOccupied ? 0 : 0
      };
      updateSeat(updatedSeat);
    }
  };

  // 필터링된 좌석 목록
  const filteredSeats = seats.filter(seat => {
    if (filterStatus === 'occupied') return seat.isOccupied;
    if (filterStatus === 'available') return !seat.isOccupied;
    return true;
  });

  // 통계 계산
  const occupiedCount = seats.filter(seat => seat.isOccupied).length;
  const totalSeats = seats.length;
  const occupancyRate = Math.round((occupiedCount / totalSeats) * 100);
  const totalPowerConsumption = seats.reduce((total, seat) => total + seat.powerConsumption, 0);
  const averageOccupancyTime = seats.filter(seat => seat.isOccupied).length > 0 
    ? seats.filter(seat => seat.isOccupied).reduce((total, seat) => total + seat.occupiedHours, 0) / occupiedCount
    : 0;
  const peakPowerUsage = Math.max(...seats.map(seat => seat.powerConsumption));
  const availableSeats = totalSeats - occupiedCount;

  const formatTime = (date) => {
    return date.toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  // 대시보드 화면
  if (currentView === 'dashboard') {
    return (
      <div className="relative flex size-full min-h-screen flex-col bg-slate-50 overflow-x-hidden" style={{fontFamily: 'Inter, "Noto Sans", sans-serif'}}>
        <div className="flex h-full grow">
          <main className="flex-1 p-8 overflow-y-auto">
            <header className="mb-8 flex items-center justify-between">
              <h1 className="text-slate-900 text-4xl font-bold tracking-tight">Smart Cafe Dashboard</h1>
              <div className="relative">
                <button 
                  onClick={() => setShowFilter(!showFilter)}
                  className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <span className="material-icons text-lg">filter_list</span>
                  <span>Filter</span>
                </button>
                {showFilter && (
                  <div className="absolute right-0 mt-2 w-64 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    <div className="p-4 space-y-4">
                      <h3 className="text-slate-900 text-lg font-semibold leading-tight">Filter Options</h3>
                      <label className="flex flex-col">
                        <span className="text-sm font-medium text-slate-700 mb-1.5">Status</span>
                        <select 
                          value={filterStatus}
                          onChange={(e) => setFilterStatus(e.target.value)}
                          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 focus:outline-0 focus:ring-2 focus:ring-blue-500 border border-slate-300 bg-white focus:border-blue-500 h-12 px-3.5 text-base font-normal leading-normal"
                        >
                          <option value="all">All Seats</option>
                          <option value="occupied">Occupied</option>
                          <option value="available">Available</option>
                        </select>
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </header>

            <section className="mb-8">
              <h3 className="text-slate-900 text-2xl font-semibold leading-tight tracking-[-0.015em] mb-4">Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-2 rounded-xl p-6 border border-slate-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between">
                    <p className="text-slate-700 text-base font-medium leading-normal">Current Time</p>
                    <span className="material-icons text-blue-600 text-xl">schedule</span>
                  </div>
                  <p className="text-slate-900 text-3xl font-bold leading-tight">{formatTime(currentTime)}</p>
                </div>
                <div className="flex flex-col gap-2 rounded-xl p-6 border border-slate-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between">
                    <p className="text-slate-700 text-base font-medium leading-normal">Seat Occupancy</p>
                    <span className="material-icons text-blue-600 text-xl">people_alt</span>
                  </div>
                  <p className="text-slate-900 text-3xl font-bold leading-tight">{occupancyRate}%</p>
                </div>
                <div className="flex flex-col gap-2 rounded-xl p-6 border border-slate-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between">
                    <p className="text-slate-700 text-base font-medium leading-normal">Total Power Consumption</p>
                    <span className="material-icons text-blue-600 text-xl">bolt</span>
                  </div>
                  <p className="text-slate-900 text-3xl font-bold leading-tight">{totalPowerConsumption} kWh</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-slate-900 text-2xl font-semibold leading-tight tracking-[-0.015em] mb-4">Seat Information</h3>
              <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-slate-600 text-xs font-semibold uppercase tracking-wider">Seat ID</th>
                      <th className="px-6 py-4 text-left text-slate-600 text-xs font-semibold uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-slate-600 text-xs font-semibold uppercase tracking-wider">Power Usage</th>
                      <th className="px-6 py-4 text-left text-slate-600 text-xs font-semibold uppercase tracking-wider">Time Occupied</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredSeats.map((seat) => (
                      <tr 
                        key={seat.id}
                        onClick={() => handleSeatClick(seat)}
                        className="hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-slate-800 text-sm font-medium">{seat.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                            seat.isOccupied 
                              ? 'bg-red-100 text-red-700' 
                              : 'bg-green-100 text-green-700'
                          }`}>
                            <span className="material-icons text-sm mr-1.5">
                              {seat.isOccupied ? 'chair' : 'event_seat'}
                            </span>
                            {seat.isOccupied ? 'Occupied' : 'Available'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-slate-600 text-sm">{seat.powerConsumption} kWh</td>
                        <td className="px-6 py-4 whitespace-nowrap text-slate-600 text-sm">{seat.occupiedHours} hours</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h3 className="text-slate-900 text-2xl font-semibold leading-tight tracking-[-0.015em] mb-4">Real-time Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-2 rounded-xl p-6 bg-slate-100 border border-slate-200">
                  <p className="text-slate-700 text-base font-medium leading-normal">Average Occupancy Time</p>
                  <p className="text-slate-900 text-3xl font-bold leading-tight">{averageOccupancyTime.toFixed(1)} hours</p>
                </div>
                <div className="flex flex-col gap-2 rounded-xl p-6 bg-slate-100 border border-slate-200">
                  <p className="text-slate-700 text-base font-medium leading-normal">Peak Power Usage</p>
                  <p className="text-slate-900 text-3xl font-bold leading-tight">{peakPowerUsage} kWh</p>
                </div>
                <div className="flex flex-col gap-2 rounded-xl p-6 bg-slate-100 border border-slate-200">
                  <p className="text-slate-700 text-base font-medium leading-normal">Total Seats Available</p>
                  <p className="text-slate-900 text-3xl font-bold leading-tight">{availableSeats}</p>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    );
  }

  // 상세 화면
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="px-4 sm:px-8 md:px-20 lg:px-40 flex flex-1 justify-center py-5">
        <div className="max-w-[960px] flex-1">
          {/* 뒤로가기 버튼 */}
          <button
            onClick={handleBackToDashboard}
            className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <span className="material-icons">arrow_back</span>
            <span className="font-medium">대시보드로 돌아가기</span>
          </button>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="material-icons text-3xl text-blue-600">chair</span>
                    <div>
                      <p className="text-gray-900 text-xl font-bold">{selectedSeat?.name}</p>
                      <p className={`text-sm font-medium flex items-center ${
                        selectedSeat?.isOccupied ? 'text-emerald-500' : 'text-gray-500'
                      }`}>
                        <span className="material-icons text-base mr-1">event_seat</span>
                        {selectedSeat?.isOccupied ? '사용 중' : '사용 가능'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <span className={`material-icons text-lg ${
                      selectedSeat?.powerOn ? 'text-amber-500' : 'text-gray-400'
                    }`}>power</span>
                    <p className="text-gray-700">
                      전원: <span className={`font-semibold ${
                        selectedSeat?.powerOn ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {selectedSeat?.powerOn ? '켜짐' : '꺼짐'}
                      </span>
                      {selectedSeat?.powerOn && (
                        <span className="text-gray-500">({selectedSeat?.powerConsumption}W)</span>
                      )}
                    </p>
                  </div>
                  
                  <div className="flex gap-2 mt-2">
                    <button 
                      onClick={togglePower}
                      className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                    >
                      <span className="material-icons text-base">power_settings_new</span>
                      <span>전원 토글</span>
                    </button>
                    
                    <button 
                      onClick={toggleOccupancy}
                      className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                    >
                      <span className="material-icons text-base">
                        {selectedSeat?.isOccupied ? 'check_circle' : 'radio_button_unchecked'}
                      </span>
                      <span>{selectedSeat?.isOccupied ? '사용 완료' : '사용 시작'}</span>
                    </button>
                    
                    <button className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors duration-200">
                      <span className="material-icons text-base">edit</span>
                      <span>정보 수정</span>
                    </button>
                  </div>
                </div>
                
                <div 
                  className="w-full md:w-48 h-32 md:h-auto md:aspect-[4/3] bg-center bg-no-repeat bg-cover rounded-lg shadow-md"
                  style={{
                    backgroundImage: `url("${selectedSeat?.image}")`
                  }}
                ></div>
              </div>
            </div>
            
            <div className="bg-gray-50 px-6 md:px-8 py-6 border-t border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <div className="flex items-center justify-between sm:justify-start sm:gap-4">
                  <div className="flex items-center text-gray-600">
                    <span className="material-icons text-xl mr-2">schedule</span>
                    <p className="text-sm font-medium">시작 시간</p>
                  </div>
                  <p className="text-gray-900 text-sm font-semibold">
                    {selectedSeat?.isOccupied ? selectedSeat?.startTime : '-'}
                  </p>
                </div>
                
                <div className="flex items-center justify-between sm:justify-start sm:gap-4">
                  <div className="flex items-center text-gray-600">
                    <span className="material-icons text-xl mr-2">hourglass_empty</span>
                    <p className="text-sm font-medium">경과 시간</p>
                  </div>
                  <p className="text-gray-900 text-sm font-semibold">
                    {selectedSeat?.isOccupied ? `${selectedSeat?.occupiedHours}시간` : '-'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;