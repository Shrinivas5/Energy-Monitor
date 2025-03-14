import React, { useState, useEffect } from 'react';
import { Bell, DollarSign, User, Shield, Save } from 'lucide-react';
import { fetchUserSettings, updateUserSettings } from '../services/api';

interface UserSettings {
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  energyBudget: {
    daily: number;
    monthly: number;
  };
  costSettings: {
    ratePerKwh: number;
    currency: string;
  };
  profile: {
    name: string;
    email: string;
    phone: string;
  };
}

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<UserSettings>({
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
      name: '',
      email: '',
      phone: '',
    },
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('notifications');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await fetchUserSettings();
        setSettings(data);
      } catch (error) {
        console.error('Failed to load settings:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSettings();
  }, []);
  
  const handleSaveSettings = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    
    try {
      await updateUserSettings(settings);
      setSaveSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Failed to save settings:', error);
    } finally {
      setIsSaving(false);
    }
  };
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'notifications':
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Notification Preferences</h2>
            <p className="text-sm text-gray-500 mb-4">
              Configure how you want to receive alerts and notifications.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-500">Receive alerts via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={settings.notifications.email}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        email: e.target.checked
                      }
                    })}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-gray-500">Receive alerts on your device</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={settings.notifications.push}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        push: e.target.checked
                      }
                    })}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">SMS Notifications</p>
                  <p className="text-sm text-gray-500">Receive alerts via text message</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={settings.notifications.sms}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        sms: e.target.checked
                      }
                    })}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        );
        
      case 'budget':
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Energy Budget</h2>
            <p className="text-sm text-gray-500 mb-4">
              Set your energy consumption targets and get alerts when you exceed them.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Daily Energy Budget (kWh)
                </label>
                <input
                  type="number"
                  value={settings.energyBudget.daily}
                  onChange={(e) => setSettings({
                    ...settings,
                    energyBudget: {
                      ...settings.energyBudget,
                      daily: Number(e.target.value)
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  step="0.1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Monthly Energy Budget (kWh)
                </label>
                <input
                  type="number"
                  value={settings.energyBudget.monthly}
                  onChange={(e) => setSettings({
                    ...settings,
                    energyBudget: {
                      ...settings.energyBudget,
                      monthly: Number(e.target.value)
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  step="1"
                />
              </div>
            </div>
          </div>
        );
        
      case 'cost':
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Cost Settings</h2>
            <p className="text-sm text-gray-500 mb-4">
              Configure your electricity rate for accurate cost calculations.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Electricity Rate (per kWh)
                </label>
                <input
                  type="number"
                  value={settings.costSettings.ratePerKwh}
                  onChange={(e) => setSettings({
                    ...settings,
                    costSettings: {
                      ...settings.costSettings,
                      ratePerKwh: Number(e.target.value)
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  step="0.01"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Currency
                </label>
                <select
                  value={settings.costSettings.currency}
                  onChange={(e) => setSettings({
                    ...settings,
                    costSettings: {
                      ...settings.costSettings,
                      currency: e.target.value
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="JPY">JPY (¥)</option>
                  <option value="CAD">CAD ($)</option>
                  <option value="AUD">AUD ($)</option>
                </select>
              </div>
            </div>
          </div>
        );
        
      case 'profile':
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Profile Information</h2>
            <p className="text-sm text-gray-500 mb-4">
              Update your personal information.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={settings.profile.name}
                  onChange={(e) => setSettings({
                    ...settings,
                    profile: {
                      ...settings.profile,
                      name: e.target.value
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={settings.profile.email}
                  onChange={(e) => setSettings({
                    ...settings,
                    profile: {
                      ...settings.profile,
                      email: e.target.value
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={settings.profile.phone}
                  onChange={(e) => setSettings({
                    ...settings,
                    profile: {
                      ...settings.profile,
                      phone: e.target.value
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('notifications')}
              className={`flex items-center space-x-2 px-4 py-3 border-b-2 ${
                activeTab === 'notifications' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
            </button>
            
            <button
              onClick={() => setActiveTab('budget')}
              className={`flex items-center space-x-2 px-4 py-3 border-b-2 ${
                activeTab === 'budget' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Zap className="h-5 w-5" />
              <span>Energy Budget</span>
            </button>
            
            <button
              onClick={() => setActiveTab('cost')}
              className={`flex items-center space-x-2 px-4 py-3 border-b-2 ${
                activeTab === 'cost' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <DollarSign className="h-5 w-5" />
              <span>Cost Settings</span>
            </button>
            
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center space-x-2 px-4 py-3 border-b-2 ${
                activeTab === 'profile' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <User className="h-5 w-5" />
              <span>Profile</span>
            </button>
          </div>
          
          <div className="p-6">
            {renderTabContent()}
            
            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={handleSaveSettings}
                disabled={isSaving}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                <Save className="h-5 w-5" />
                <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
              </button>
              
              {saveSuccess && (
                <span className="text-green-600 flex items-center">
                  <Shield className="h-5 w-5 mr-1" />
                  Settings saved successfully!
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;