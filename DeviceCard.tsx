import React, { useState } from 'react';
import { Zap, Power, Settings } from 'lucide-react';
import { updateDeviceStatus } from '../services/api';

interface DeviceProps {
  device: {
    id: string;
    name: string;
    type: string;
    status: string;
    currentUsage: number;
    averageUsage: number;
    threshold: number;
    location: string;
  };
}

const DeviceCard: React.FC<DeviceProps> = ({ device }) => {
  const [status, setStatus] = useState(device.status);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleToggle = async () => {
    setIsLoading(true);
    try {
      const newStatus = status === 'active' ? 'inactive' : 'active';
      await updateDeviceStatus(device.id, newStatus);
      setStatus(newStatus);
    } catch (error) {
      console.error('Failed to update device status:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const isOverThreshold = device.currentUsage > device.threshold;
  
  return (
    <div className={`bg-white rounded-lg shadow p-4 border-l-4 ${isOverThreshold ? 'border-red-500' : 'border-green-500'}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{device.name}</h3>
          <p className="text-sm text-gray-500">{device.location}</p>
        </div>
        <div className={`p-2 rounded-full ${status === 'active' ? 'bg-green-100' : 'bg-gray-100'}`}>
          {device.type === 'light' ? (
            <Zap className={`h-5 w-5 ${status === 'active' ? 'text-green-500' : 'text-gray-400'}`} />
          ) : (
            <Settings className={`h-5 w-5 ${status === 'active' ? 'text-green-500' : 'text-gray-400'}`} />
          )}
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium">Current Usage</span>
          <span className={`text-sm font-medium ${isOverThreshold ? 'text-red-500' : 'text-green-500'}`}>
            {device.currentUsage} kWh
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${isOverThreshold ? 'bg-red-500' : 'bg-green-500'}`}
            style={{ width: `${Math.min((device.currentUsage / device.threshold) * 100, 100)}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-1">Threshold: {device.threshold} kWh</p>
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <span className="text-sm text-gray-500">
          {status === 'active' ? 'Active' : 'Inactive'}
        </span>
        <button
          onClick={handleToggle}
          disabled={isLoading}
          className={`flex items-center space-x-1 px-3 py-1 rounded-md ${
            status === 'active' 
              ? 'bg-red-50 text-red-600 hover:bg-red-100' 
              : 'bg-green-50 text-green-600 hover:bg-green-100'
          }`}
        >
          <Power className="h-4 w-4" />
          <span>{isLoading ? 'Updating...' : status === 'active' ? 'Turn Off' : 'Turn On'}</span>
        </button>
      </div>
    </div>
  );
};

export default DeviceCard;