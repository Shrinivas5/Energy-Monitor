import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Home, BarChart3, LogOut, PlusCircle, Zap } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-blue-600" />
            <h1 className="text-xl font-bold">EnergyMonitor</h1>
          </div>
        </div>
        
        <div className="p-4">
          <div className="mb-4">
            <p className="text-sm text-blue-600 font-medium">Welcome</p>
          </div>
          
          <nav className="space-y-1">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 w-full px-4 py-2 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600"
            >
              <Home className="h-5 w-5" />
              <span>Dashboard</span>
            </button>
            
            <button 
              onClick={() => navigate('/devices')}
              className="flex items-center space-x-2 w-full px-4 py-2 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600"
            >
              <PlusCircle className="h-5 w-5" />
              <span>Devices</span>
            </button>
          </nav>
        </div>
        
        <div className="absolute bottom-0 w-64 p-4 border-t">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-2 w-full px-4 py-2 text-gray-700 rounded-md hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;