import React from 'react';
import { AlertTriangle, Zap, Info } from 'lucide-react';
import { format } from 'date-fns';

interface AlertProps {
  alert: {
    id: number;
    type: string;
    message: string;
    timestamp: Date;
    deviceId?: string;
  };
}

const AlertCard: React.FC<AlertProps> = ({ alert }) => {
  const getIcon = () => {
    switch (alert.type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'device':
        return <Zap className="h-5 w-5 text-red-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };
  
  const getBgColor = () => {
    switch (alert.type) {
      case 'warning':
        return 'bg-yellow-50';
      case 'device':
        return 'bg-red-50';
      default:
        return 'bg-blue-50';
    }
  };
  
  return (
    <div className={`${getBgColor()} p-3 rounded-md flex items-start`}>
      <div className="mr-3 mt-0.5">
        {getIcon()}
      </div>
      <div>
        <p className="text-sm font-medium">{alert.message}</p>
        <p className="text-xs text-gray-500 mt-1">
          {format(new Date(alert.timestamp), 'PPp')}
        </p>
      </div>
    </div>
  );
};

export default AlertCard;