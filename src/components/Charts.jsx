import React from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

export const DailySignupsChart = ({ data }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 border pr-10">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Users Created Per Day (Last 30 Days)</h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Bar dataKey="users" fill="#3B82F6" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export const AvatarDistributionChart = ({ data }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 border">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Avatar Distribution</h3>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export const SignupTimeChart = ({ data }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 border">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Signup Time Distribution</h3>
    <div className="h-full flex justify-center items-center">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="time" 
            angle={0}
            textAnchor="middle"
            height={80}
            interval={0}
            tick={{ fontSize: 12 }}
          />
          <YAxis />
          <Bar dataKey="users" fill="#3B82F6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);