import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { AlertTriangle, Zap, DollarSign, BarChart3 } from 'lucide-react';
import { fetchEnergyData, fetchDeviceData } from '../services/api';
import EnergyUsageCard from '../components/EnergyUsageCard';
import DeviceCard from '../components/DeviceCard';
import AlertCard from '../components/AlertCard';

const Dashboard: React.FC = () => {
  const [energyData, setEnergyData] = useState<any[]>([]);
  const [deviceData, setDeviceData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [timeRange, setTimeRange] = useState<string>('day');
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const energy = await fetchEnergyData(timeRange);
        const devices = await fetchDeviceData();
        
        setEnergyData(energy);
        setDeviceData(devices);
        
        // Generate alerts based on thresholds
        const newAlerts = [];
        const totalUsage = energy.reduce((sum, item) => sum + item.usage, 0);
        
        if (totalUsage > 30) {
          newAlerts.push({
            id: 1,
            type: 'warning',
            message: 'Your energy usage is above your daily budget',
            timestamp: new Date(),
          });
        }
        
        const highUsageDevices = devices.filter(device => device.currentUsage > device.threshold);
        highUsageDevices.forEach(device => {
          newAlerts.push({
            id: newAlerts.length + 1,
            type: 'device',
            message: `${device.name} is consuming more energy than usual`,
            timestamp: new Date(),
            deviceId: device.id,
          });
        });
        
        setAlerts(newAlerts);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
    
    // Refresh data every minute
    const interval = setInterval(loadData, 60000);
    return () => clearInterval(interval);
  }, [timeRange]);

  const totalUsage = energyData.reduce((sum, item) => sum + item.usage, 0);
  const estimatedCost = totalUsage * 0.15; // Assuming $0.15 per kWh
  
  const formatXAxis = (tickItem: string) => {
    const date = new Date(tickItem);
    if (timeRange === 'day') {
      return format(date, 'HH:mm');
    } else if (timeRange === 'week') {
      return format(date, 'EEE');
    } else if (timeRange === 'month') {
      return format(date, 'dd MMM');
    }
    return tickItem;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Energy Dashboard</h1>
        <div className="flex space-x-2">
          <button 
            onClick={() => setTimeRange('day')}
            className={`px-4 py-2 rounded-md ${timeRange === 'day' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Day
          </button>
          <button 
            onClick={() => setTimeRange('week')}
            className={`px-4 py-2 rounded-md ${timeRange === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Week
          </button>
          <button 
            onClick={() => setTimeRange('month')}
            className={`px-4 py-2 rounded-md ${timeRange === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Month
          </button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <EnergyUsageCard 
              title="Total Energy Usage"
              value={`${totalUsage.toFixed(2)} kWh`}
              icon={<Zap className="h-8 w-8 text-yellow-500" />}
              change={+5.2}
              description="vs. last period"
            />
            
            <EnergyUsageCard 
              title="Estimated Cost"
              value={`$${estimatedCost.toFixed(2)}`}
              icon={<DollarSign className="h-8 w-8 text-green-500" />}
              change={-2.1}
              description="vs. last period"
            />
            
            <EnergyUsageCard 
              title="Active Devices"
              value={deviceData.filter(d => d.status === 'active').length.toString()}
              icon={<BarChart3 className="h-8 w-8 text-blue-500" />}
              change={0}
              description="No change"
            />
          </div>
          
          {/* Alerts */}
          {alerts.length > 0 && (
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                <h2 className="text-lg font-semibold">Alerts</h2>
              </div>
              <div className="space-y-3">
                {alerts.map(alert => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </div>
            </div>
          )}
          
          {/* Energy Usage Chart */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-4">Energy Consumption</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={energyData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="timestamp" 
                    tickFormatter={formatXAxis}
                  />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => [`${value} kWh`, 'Energy Usage']}
                    labelFormatter={(label) => format(new Date(label), 'PPpp')}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="usage" 
                    stroke="#3b82f6" 
                    activeDot={{ r: 8 }} 
                    name="Energy Usage (kWh)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Device Usage Chart */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-4">Device Energy Consumption</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={deviceData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => [`${value} kWh`, 'Energy Usage']}
                  />
                  <Legend />
                  <Bar dataKey="currentUsage" fill="#3b82f6" name="Current Usage (kWh)" />
                  <Bar dataKey="averageUsage" fill="#93c5fd" name="Average Usage (kWh)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Device Cards */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Your Devices</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {deviceData.map(device => (
                <DeviceCard key={device.id} device={device} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;