import React, { useMemo } from 'react';
import KPICards from '../components/KPICards';
import { DailySignupsChart, AvatarDistributionChart, SignupTimeChart } from '../components/Charts';
import RecentUsersCard from '../components/RecentUsersCard';
import { COLORS } from '../constants';

const DashboardPage = ({ users, formatDate }) => {
  const dashboardMetrics = useMemo(() => {
    if (!users.length) return null;

    const totalUsers = users.length;
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const last30Days = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayKey = date.toISOString().split('T')[0];
      last30Days.push({
        date: dayKey,
        displayDate: date.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' }),
        users: 0
      });
    }

    users.forEach(user => {
      const userDate = new Date(user.createdAt);
      if (userDate >= thirtyDaysAgo) {
        const dayKey = userDate.toISOString().split('T')[0];
        const dayData = last30Days.find(day => day.date === dayKey);
        if (dayData) {
          dayData.users++;
        }
      }
    });

    const dailyData = last30Days.map(day => ({
      date: day.displayDate,
      users: day.users
    }));

    const hasAvatar = users.filter(user => user.avatar && user.avatar.trim() !== '').length;
    const noAvatar = totalUsers - hasAvatar;
    const avatarData = [
      { name: 'With Avatar', value: hasAvatar, color: COLORS[0] },
      { name: 'No Avatar', value: noAvatar, color: COLORS[1] }
    ];

    const timeSlots = {
      'Morning (6-12)': 0,
      'Afternoon (12-18)': 0,
      'Evening (18-24)': 0,
      'Night (0-6)': 0
    };

    users.forEach(user => {
      const hour = new Date(user.createdAt).getHours();
      if (hour >= 6 && hour < 12) timeSlots['Morning (6-12)']++;
      else if (hour >= 12 && hour < 18) timeSlots['Afternoon (12-18)']++;
      else if (hour >= 18 && hour < 24) timeSlots['Evening (18-24)']++;
      else timeSlots['Night (0-6)']++;
    });

    const timeData = Object.entries(timeSlots).map(([time, count], index) => ({
      time,
      users: count,
      color: COLORS[index]
    }));

    const recentUsers = [...users]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);

    return {
      totalUsers,
      dailyData,
      avatarData,
      timeData,
      recentUsers
    };
  }, [users]);

  if (!dashboardMetrics) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <KPICards dashboardMetrics={dashboardMetrics} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DailySignupsChart data={dashboardMetrics.dailyData} />
        <AvatarDistributionChart data={dashboardMetrics.avatarData} />
        <SignupTimeChart data={dashboardMetrics.timeData} />
        <RecentUsersCard users={dashboardMetrics.recentUsers} formatDate={formatDate} />
      </div>
    </div>
  );
};

export default DashboardPage;