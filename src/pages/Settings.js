import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import MemoryIcon from '@mui/icons-material/Memory';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import SettingsIcon from '@mui/icons-material/Settings';


const Settings = (props) => {
    return(
        <div className="bg-gray-100 min-h-screen">
      <div className="px-4 sm:px-8 md:px-20 lg:px-40 flex flex-1 justify-center py-5">
        <div className="max-w-[960px] flex-1">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 md:p-8">
              {/* 헤더 섹션 */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">STAY-SENS</h1>
                <div className="w-full h-px bg-gray-200 mb-6"></div>
              </div>

              {/* 설정 타이틀 */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">설정</h2>
                <div className="w-full h-px bg-gray-200"></div>
              </div>
            </div>
            
            {/* 아이콘 섹션 */}
            <div className="bg-gray-50 px-6 md:px-8 py-8 border-t border-gray-200">
              <div className="w-full h-px bg-gray-200 mb-8"></div>
              <div className="flex items-center justify-center gap-8 flex-wrap">
                <button className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-white transition-all duration-200 shadow-sm hover:shadow-md">
                  <HomeIcon size={40} className="text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">홈</span>
                </button>
                
                <button className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-white transition-all duration-200 shadow-sm hover:shadow-md">
                  <MemoryIcon size={40} className="text-green-600" />
                  <span className="text-sm font-medium text-gray-700">메모리</span>
                </button>
                
                <button className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-white transition-all duration-200 shadow-sm hover:shadow-md">
                  <AppRegistrationIcon size={40} className="text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">앱 등록</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-white transition-all duration-200 shadow-sm hover:shadow-md">
                  <SettingsIcon size={40} className="text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">설정</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

export default Settings;