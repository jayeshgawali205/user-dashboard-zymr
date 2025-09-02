import React from 'react';
import { Users, Image, Clock } from 'lucide-react';

const KPICards = ({ dashboardMetrics }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="bg-white rounded-xl shadow-sm h-20 p-3 border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">Total Users</p>
          <p className="text-2xl font-bold text-gray-900">{dashboardMetrics.totalUsers}</p>
        </div>
        <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <Users className="h-6 w-6 text-blue-600" />
        </div>
      </div>
    </div>
    
    <div className="bg-white rounded-xl shadow-sm h-20 p-3 border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">With Avatars</p>
          <p className="text-2xl font-bold text-gray-900">{dashboardMetrics.avatarData[0].value}</p>
        </div>
        <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
          <Image className="h-6 w-6 text-green-600" />
        </div>
      </div>
    </div>

    <div className="bg-white rounded-xl shadow-sm h-20 p-3 border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">Peak Hour</p>
          <p className="text-2xl font-bold text-gray-900">
            {dashboardMetrics.timeData.reduce((max, curr) => curr.users > max.users ? curr : max).time.split(' ')[0]}
          </p>
        </div>
        <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
          <Clock className="h-6 w-6 text-orange-600" />
        </div>
      </div>
    </div>
  </div>
);

export default KPICards;