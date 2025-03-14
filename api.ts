// This is a mock API service for the IoT Energy Monitoring application
// In a real application, this would connect to a backend server

import { v4 as uuidv4 } from 'uuid';

// Mock user data
const MOCK_USER = {
  id: '1',
  name: 'Demo User',
  email: 'demo@example.com',
};

// Mock authentication functions
export const login = async (email: string, password: string) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // For demo purposes, accept any credentials
  if (email === 'demo@example.com' && password === 'password123') {
    return {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6ImRlbW9AZXhhbXBsZS5jb20iLCJuYW1lIjoiRGVtbyBVc2VyIiwiZXhwIjoxNzI1MDAwMDAwfQ.signature',
      user: MOCK_USER,
    };
  }
  
  throw new Error('Invalid credentials');
};

export const register = async (name: string, email: string, password: string) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // For demo purposes, accept any registration
  return {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6ImRlbW9AZXhhbXBsZS5jb20iLCJuYW1lIjoiRGVtbyBVc2VyIiwiZXhwIjoxNzI1MDAwMDAwfQ.signature',
    user: {
      id: '1',
      name,
      email,
    },
  };
};

// Mock energy data
const generateEnergyData = (timeRange: string) => {
  const now = new Date();
  const data = [];
  
  if (timeRange === 'day') {
    // Generate hourly data for the past 24 hours
    for (let i = 23; i >= 0; i--) {
      const timestamp = new Date(now);
      timestamp.setHours(now.getHours() - i);
      
      data.push({
        timestamp: timestamp.toISOString(),
        usage: Math.random() * 2 + 0.5, // Random usage between 0.5 and 2.5 kWh
      });
    }
  } else if (timeRange === 'week') {
    // Generate daily data for the past 7 days
    for (let i = 6; i >= 0; i--) {
      const timestamp = new Date(now);
      timestamp.setDate(now.getDate() - i);
      
      data.push({
        timestamp: timestamp.toISOString(),
        usage: Math.random() * 10 + 5, // Random usage between 5 and 15 kWh
      });
    }
  } else if (timeRange === 'month') {
    // Generate data for the past 30 days
    for (let i = 29; i >= 0; i--) {
      const timestamp = new Date(now);
      timestamp.setDate(now.getDate() - i);
      
      data.push({
        timestamp: timestamp.toISOString(),
        usage: Math.random() * 15 + 8, // Random usage between 8 and 23 kWh
      });
    }
  }
  
  return data;
};

// Mock device data
const MOCK_DEVICES = [
  {
    id: '1',
    name: 'Living Room TV',
    type: 'entertainment',
    status: 'active',
    currentUsage: 0.8,
    averageUsage: 0.7,
    threshold: 1.0,
    location: 'Living Room',
  },
  {
    id: '2',
    name: 'Kitchen Refrigerator',
    type: 'appliance',
    status: 'active',
    currentUsage: 1.2,
    averageUsage: 1.0,
    threshold: 1.5,
    location: 'Kitchen',
  },
  {
    id: '3',
    name: 'Bedroom AC',
    type: 'hvac',
    status: 'inactive',
    currentUsage: 0,
    averageUsage: 2.5,
    threshold: 3.0,
    location: 'Bedroom',
  },
  {
    id: '4',
    name: 'Office Computer',
    type: 'entertainment',
    status: 'active',
    currentUsage: 0.5,
    averageUsage: 0.4,
    threshold: 0.8,
    location: 'Office',
  },
  {
    id: '5',
    name: 'Bathroom Heater',
    type: 'hvac',
    status: 'inactive',
    currentUsage: 0,
    averageUsage: 1.8,
    threshold: 2.0,
    location: 'Bathroom',
  },
  {
    id: '6',
    name: 'Washing Machine',
    type: 'appliance',
    status: 'active',
    currentUsage: 2.1,
    averageUsage: 1.5,
    threshold: 2.0,
    location: 'Laundry Room',
  },
];

// Mock API functions
export const fetchEnergyData = async (timeRange: string = 'day') => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return generateEnergyData(timeRange);
};

export const fetchDeviceData = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 600));
  
  return MOCK_DEVICES;
};

export const updateDeviceStatus = async (deviceId: string, status: string) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real app, this would update the device status on the server
  return { success: true };
};

export const addDevice = async (deviceData: any) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 700));
  
  // Create a new device with the provided data
  const newDevice = {
    id: uuidv4(),
    status: 'inactive',
    currentUsage: 0,
    averageUsage: 0,
    ...deviceData,
  };
  
  // In a real app, this would add the device to the database
  return newDevice;
};

export const removeDevice = async (deviceId: string) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real app, this would remove the device from the database
  return { success: true };
};

export const fetchUserSettings = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Return mock user settings
  return {
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    energyBudget: {
      daily: 10,
      monthly: 300,
    },
    costSettings: {
      ratePerKwh: 0.15,
      currency: 'USD',
    },
    profile: {
      name: 'Demo User',
      email: 'demo@example.com',
      phone: '+1 (555) 123-4567',
    },
  };
};

export const updateUserSettings = async (settings: any) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // In a real app, this would update the user settings in the database
  return { success: true };
};